
import ratelimit from "../Config/upstash.js";

async function rateLimiter (_, res, next) {
 try {
        const{success} = await ratelimit.limit("my-limit-key");
        if(!success) return res.status(429).json({message: "Too many requests"});
        next();
    } catch (error) {
        console.error('Rate limiting error:', error)
        next(error);
    }
}
export default rateLimiter;
