import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { env } from "../config/env.js";
import { RefreshTokenModel, hashRefreshToken } from "../models/RefreshToken.model.js";
import { ApiError } from "../utils/ApiError.js";
function signToken(payload, secret, expiresIn) {
    const options = { expiresIn: expiresIn };
    return jwt.sign(payload, secret, options);
}
export function createAccessToken(userId, role) {
    return signToken({ sub: userId, role, tokenType: "access" }, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN);
}
export function createRefreshJwt(userId, role) {
    return signToken({ sub: userId, role, tokenType: "refresh" }, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN);
}
export function verifyAccessToken(token) {
    try {
        const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
        if (payload.tokenType !== "access")
            throw new ApiError(401, "Invalid access token");
        return payload;
    }
    catch (error) {
        if (error instanceof ApiError)
            throw error;
        throw new ApiError(401, "Invalid or expired access token");
    }
}
export function verifyRefreshToken(token) {
    try {
        const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
        if (payload.tokenType !== "refresh")
            throw new ApiError(401, "Invalid refresh token");
        return payload;
    }
    catch (error) {
        if (error instanceof ApiError)
            throw error;
        throw new ApiError(401, "Invalid or expired refresh token");
    }
}
function getRefreshExpiry() {
    const value = env.JWT_REFRESH_EXPIRES_IN;
    const match = /^(\d+)([smhd])$/.exec(value);
    if (!match)
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const amount = Number(match[1]);
    const unit = match[2];
    const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
    return new Date(Date.now() + amount * multipliers[unit]);
}
export async function storeRefreshToken(token, userId, ip, userAgent) {
    return RefreshTokenModel.create({
        userId: new Types.ObjectId(userId),
        tokenHash: hashRefreshToken(token),
        expiresAt: getRefreshExpiry(),
        createdByIp: ip,
        userAgent,
    });
}
export async function findStoredRefreshToken(token) {
    return RefreshTokenModel.findOne({ tokenHash: hashRefreshToken(token) });
}
export async function revokeRefreshToken(token, ip) {
    const stored = await findStoredRefreshToken(token);
    if (!stored || stored.revokedAt)
        return stored;
    stored.revokedAt = new Date();
    stored.revokedByIp = ip;
    await stored.save();
    return stored;
}
export async function revokeAllUserRefreshTokens(userId, ip) {
    await RefreshTokenModel.updateMany({ userId: new Types.ObjectId(userId), revokedAt: null }, { $set: { revokedAt: new Date(), revokedByIp: ip } });
}
export async function rotateRefreshToken(currentToken, role, ip, userAgent) {
    const payload = verifyRefreshToken(currentToken);
    const stored = await findStoredRefreshToken(currentToken);
    if (!stored)
        throw new ApiError(401, "Refresh session not found");
    if (stored.revokedAt) {
        await revokeAllUserRefreshTokens(String(stored.userId), ip);
        throw new ApiError(401, "Refresh session was revoked");
    }
    await revokeRefreshToken(currentToken, ip);
    const nextRefreshToken = createRefreshJwt(payload.sub, role);
    await storeRefreshToken(nextRefreshToken, payload.sub, ip, userAgent);
    return nextRefreshToken;
}
//# sourceMappingURL=token.service.js.map