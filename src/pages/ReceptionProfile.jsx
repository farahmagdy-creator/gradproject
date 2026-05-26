import { Star, Wrench } from "lucide-react";
import ProfilePage from "../components/shared/ProfilePage";
import COLORS from "../constants/theme";

const receptionist = {
  name:       "إسراء أحمد",
  role:       "موظفة استقبال",
  employeeId: "EMP-002",
  phone:      "1284167715 20+",
  nationalId: "30308200403786",
  email:      "esraaahmed1541@gmail.com",
  address:    "221 شارع 45 - العصافرة",
  age:        "23",
  hireDate:   "1 May 2021",
};

const stats = [
  {
    title:     "إجمالي عمليات الإصلاح",
    value:     "788",
    sub:       "+12% this month",
    color:     COLORS.primary,
    icon:      <Wrench size={22} />,
    cardWidth: "555px",
  },
  {
    title:     "معدل دقة بيانات الاستلام",
    value:     "95%",
    sub:       "788 reviews",
    color:     COLORS.success,
    icon:      <Star size={22} />,
    cardWidth: "555px",
  },
];

function ReceptionProfile() {
  return (
    <ProfilePage
      user={receptionist}
      avatarSrc="image/reception.png"
      hireDateLabel="تاريخ الانضمام"
      stats={stats}
    />
  );
}

export default ReceptionProfile;
