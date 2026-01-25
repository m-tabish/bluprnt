import navlogo from "@/assets/navlogo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function AvatarDemo() {
    return (
        <Avatar className="py-1">
            <AvatarImage
                src={navlogo}
                alt="@tabish"
                className=""
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
