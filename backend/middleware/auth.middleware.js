import { createRemoteJWKSet, jwtVerify } from "jose";

const supabaseProjectUrl = process.env.SUPABASE_URL;

if (!supabaseProjectUrl) {
    console.error("CRITICAL: SUPABASE_URL is not configured in backend .env");
}

// Set up the remote JSON Web Key Set (JWKS) pointing to your Supabase Auth endpoint
const JWKS = createRemoteJWKSet(
    new URL(`${supabaseProjectUrl}/auth/v1/.well-known/jwks.json`)
);

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify the JWT token signature asynchronously using JWKS
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: `${supabaseProjectUrl}/auth/v1`,
        });

        // Attach user metadata to the request
        req.user = {
            id: payload.sub, // The user's UUID in Supabase
            email: payload.email
        };

        next();
    } catch (error) {
        console.error("JWKS Verification Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token"
        });
    }
};
