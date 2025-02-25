import Card from "@/components/card";
import Link from "next/link";

const ArchivedNotifications = () => {
    return (
        <>
            <Card>
                <div style={{ display: "block" }}>
                    Archived Notifications
                </div>
                <div style={{ marginTop: "10px" }}>
                    <Link style={{ display: "block" }} href={"/routing-demo/complex-dashboard"}>
                        Default Notification
                    </Link>
                </div>
            </Card>
        </>
    );
};

export default ArchivedNotifications;
