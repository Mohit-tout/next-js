import Card from "@/components/card";
import Link from "next/link";

const Notifications = () => {
    return (
        <>
            <Card>
                <div style={{ display: "block" }}>
                    Notifications Metrix
                </div>

                {/* Spacing ke liye margin-top use kiya */}
                <div style={{ marginTop: "10px" }}>
                    <Link style={{ display: "block" }} href={"/routing-demo/complex-dashboard/archived"}>
                        Archived
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default Notifications;
