import { Button } from "@/components/ui/button";
import {
  AvatarIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import DarkMode from "@/components/DarkMode/DarkMode";

const Navbar = ({ handleDarkModeToggle }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () => {
    if (!auth.user) return;

    if (auth.user.role === "ROLE_ADMIN") {
      navigate("/admin/withdrawal");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="px-2 py-3 border-b z-50 bg-background sticky top-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <Button className="rounded-full h-11 w-11" variant="ghost" size="icon">
              <DragHandleHorizontalIcon className="h-7 w-7" />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-72" side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                  </Avatar>
                  <div>
                    <span className="font-bold text-orange-700">BitFlow</span>
                    <span className="text-orange-700">Trade</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <SideBar />
          </SheetContent>
        </Sheet>

        <p onClick={() => navigate("/")} className="cursor-pointer">
          BitFlow Trading
        </p>

        <Button variant="outline" onClick={() => navigate("/search")}>
          <MagnifyingGlassIcon />
          <span className="ml-2">Search</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <DarkMode handleDarkModeToggle={handleDarkModeToggle} />

        <Avatar className="cursor-pointer" onClick={handleNavigate}>
          {!auth.user ? (
            <AvatarIcon className="h-8 w-8" />
          ) : (
            <AvatarFallback>
              {auth.user.fullName
                ? auth.user.fullName.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;