
import { db } from "@/controllers/client/client";
export async function updateLikes({ id, user_id }: { id: string, user_id: string }) {
    
    try {
        await db.from("likes").insert({
            user_id: user_id,
            status_id: id,
        });
        
        console.log("likes updated");
    } catch (error) {
        console.error(error);
    }
}