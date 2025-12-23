// import { useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import AccountVarificationForm from "./AccountVarificationForm";
// import { VerifiedIcon } from "lucide-react";
// import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

// const Profile = () => {
//   const { auth } = useSelector((store) => store);
//   const dispatch = useDispatch();
  
//   // Local state to handle the edit mode and values
//   const [isEditing, setIsEditing] = useState(false);
//   const [editableData, setEditableData] = useState({
//     dob: "",
//     nationality: "",
//     address: "",
//     city: "",
//     postcode: "",
//     country: "",
//   });

//   const handleEnableTwoStepVerification = (otp) => {
//     dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }));
//   };

//   const handleVerifyOtp = (otp) => {
//     dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
//   };

//   // Handle edit button click
//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     setEditableData({
//       ...editableData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle image change
//   // const handleImageChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setProfileImage(reader.result); // Update state with the new image
//   //     };
//   //     reader.readAsDataURL(file); // Read the file as a data URL
//   //   }
//   // };

//   // Handle save button
//   const handleSave = () => {
//     // Here, you can dispatch an action or call an API to save the updated data.
//     console.log("Updated Data: ", editableData);
//     // console.log("Profile Image: ", profileImage);
//     setIsEditing(false); // Switch back to view mode
//   };

//   // Handle cancel button
//   const handleCancel = () => {
//     setIsEditing(false); // Revert to view mode without saving
//   };

//   return (
//     <div className="flex flex-col items-center pb-5">
//       <div className="pt-10 w-full lg:w-[60%]">
//         <Card>
//         <CardHeader className="pb-9 flex justify-between bold">
//         <CardTitle>Your Information</CardTitle>
//           {!isEditing && (
//             <Button onClick={handleEditClick} variant="secondary" className="ml-auto">
//               Edit
//             </Button>
//           )}
//         </CardHeader>

//         {/* Profile Image Section
//         <div className="flex items-center mb-5">
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full border border-gray-300 object-cover mr-5"
//               />
//               <div>
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleImageChange} // Handle image change
//                   className="mt-2" 
//                 />
//               </div>
//             </div> */}

//           <CardContent>
//             <div className="lg:flex gap-32">
//               <div className="space-y-7">
//                 <div className="flex">
//                   <p className="w-[9rem]">Email : </p>
//                   <p className="text-gray-500">{auth.user?.email} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">Full Name : </p>
//                   <p className="text-gray-500">{auth.user?.fullName} </p>
//                 </div>
//                 <div className="flex ">
//                     <p className="w-[9rem]">Date Of Birth :</p>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="dob"
//                         className="border w-[75%] py-2 px-3 box"
//                         value={editableData.dob}
//                         onChange={handleInputChange}
//                       />
//                     ) : (
//                       <p className="text-gray-500">{editableData.dob}</p>
//                     )}
//                 </div>
//                 <div className="flex">
//                     <p className="w-[9rem]">Nationality :</p>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="nationality"
//                         className="border w-full py-2 px-3 box"
//                         value={editableData.nationality}
//                         onChange={handleInputChange}
//                       />
//                     ) : (
//                       <p className="text-gray-500">{editableData.nationality}</p>
//                     )}
//                 </div>
//               </div>
//               <div className="space-y-7">
//                 <div className="flex justify-between">
//                     <p className="w-[9rem]">Address :</p>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="address"
//                         className="border w-full py-2 px-3 box"
//                         value={editableData.address}
//                         onChange={handleInputChange}
//                       />
//                     ) : (
//                       <p className="text-gray-500">{editableData.address}</p>
//                     )}
//                 </div>
//                 <div className="flex">
//                     <p className="w-[9rem]">City :</p>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="city"
//                         className="border w-full py-2 px-3 box"
//                         value={editableData.city}
//                         onChange={handleInputChange}
//                       />
//                     ) : (
//                       <p className="text-gray-500">{editableData.city}</p>
//                     )}
//                 </div>
//                 <div className="flex">
//                     <p className="w-[9rem]">Postcode :</p>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="postcode"
//                         className="border w-full py-2 px-3 box"
//                         value={editableData.postcode}
//                         onChange={handleInputChange}
//                       />
//                     ) : (
//                       <p className="text-gray-500">{editableData.postcode}</p>
//                     )}
//                 </div>
//                 <div className="flex">
//                     <p className="w-[9rem]">Country :</p>
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="country"
//                         className="border w-full py-2 px-3 box"
//                         value={editableData.country}
//                         onChange={handleInputChange}
//                       />
//                     ) : (
//                       <p className="text-gray-500">{editableData.country}</p>
//                     )}
//                 </div>
//               </div>
//             </div>
//             {isEditing && (
//               <div className="mt-4 flex gap-4">
//                 <Button onClick={handleSave} variant="primary">
//                   Save
//                 </Button>
//                 <Button onClick={handleCancel} variant="secondary">
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
        
//         <div className="mt-6">
//           <Card className="w-full">
//             <CardHeader className="pb-7">
//               <div className="flex items-center gap-3">
//                 <CardTitle>2 Step Verification</CardTitle>

//                 {auth.user.twoFactorAuth?.enabled ? (
//                   <Badge className="space-x-2 text-white bg-green-600">
//                     <VerifiedIcon /> <span>{"Enabled"}</span>
//                   </Badge>
//                 ) : (
//                   <Badge className="bg-orange-500">Disabled</Badge>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <div>
//                 <Dialog>
//                   <DialogTrigger>
//                     <Button>Enabled Two Step Verification</Button>
//                   </DialogTrigger>
//                   <DialogContent className="">
//                     <DialogHeader className="">
//                       <DialogTitle className="px-10 pt-5 text-center">
//                         Verify your account
//                       </DialogTitle>
//                     </DialogHeader>
//                     <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="lg:flex gap-5 mt-5">
//           <Card className="w-full">
//             <CardHeader className="pb-7">
//               <CardTitle>Change Password</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5 ">
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Email :</p>
//                 <p>{auth.user.email}</p>
//               </div>
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Password :</p>
//                 <Button variant="secondary">Change Password</Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="w-full">
//             <CardHeader className="pb-7">
//               <div className="flex items-center gap-3">
//                 <CardTitle>Account Status</CardTitle>

//                 {auth.user.verified ? (
//                   <Badge className="space-x-2 text-white bg-green-600">
//                     <VerifiedIcon /> <span>Verified</span>
//                   </Badge>
//                 ) : (
//                   <Badge className="bg-orange-500">Pending</Badge>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Email :</p>
//                 <p>{auth.user.email}</p>
//               </div>
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Mobile :</p>
//                 <p>+91 *********</p>
//               </div>
//               <div>
//                 <Dialog>
//                   <DialogTrigger>
//                     <Button>Verify Account</Button>
//                   </DialogTrigger>
//                   <DialogContent className="">
//                     <DialogHeader className="">
//                       <DialogTitle className="px-10 pt-5 text-center">
//                         Verify your account
//                       </DialogTitle>
//                     </DialogHeader>
//                     <AccountVarificationForm handleSubmit={handleVerifyOtp} />
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import AccountVarificationForm from "./AccountVarificationForm";
import { VerifiedIcon } from "lucide-react";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleEnableTwoStepVerification =(otp)=>{
    console.log("EnableTwoStepVerification",otp)
    dispatch(enableTwoStepAuthentication({jwt:localStorage.getItem("jwt"),otp}))
  }

  const handleVerifyOtp=(otp)=>{
    console.log("otp  - ",otp)
    dispatch(verifyOtp({jwt:localStorage.getItem("jwt"),otp}))
  }
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email : </p>
                  <p className="text-gray-500">{auth.user?.email} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Full Name : </p>
                  <p className="text-gray-500">{auth.user?.fullName} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Date Of Birth : </p>
                  <p className="text-gray-500">{"08/10/2024"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality : </p>
                  <p className="text-gray-500">{"Indian"} </p>
                </div>
              </div>
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address : </p>
                  <p className="text-gray-500">{"Bangalore"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">City : </p>
                  <p className="text-gray-500">{"Bangalore"} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Postcode : </p>
                  <p className="text-gray-500">{560100} </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country : </p>
                  <p className="text-gray-500">{"India"} </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
        <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>

                {auth.user.twoFactorAuth?.enabled ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>{"Enabled"}</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Enabled Two Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader className="">
                      <DialogTitle className="px-10 pt-5 text-center">
                        verify your account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:flex gap-5 mt-5">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 ">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{auth.user.email}</p>
              </div>
              {/* <div className="flex items-center">
                <p className="w-[8rem]">Mobile :</p>
                <p>+918987667899</p>
              </div> */}
              <div className="flex items-center">
                <p className="w-[8rem]">Password :</p>
                <Button variant="secondary">Change Password</Button>
              </div>
            </CardContent>
          </Card>
          {/* <Card className="w-full">
            <CardHeader>
              <CardTitle>Close Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 ">
              <div className="flex items-center">
                <p className="w-[8rem]">Customer Id :</p>
                <p>#53DKJ736</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Account :</p>
                <Button variant="secondary">Close Account</Button>
              </div>
            </CardContent>
          </Card> */}
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>Account Status</CardTitle>

                {auth.user.verified ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>verified</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{auth.user.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Mobile :</p>
                <p>+91 **********</p>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Verify Account</Button>
                    
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader className="">
                      <DialogTitle className="px-10 pt-5 text-center">
                        verify your account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleVerifyOtp}/>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
