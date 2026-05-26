import { Star, Wrench, Zap } from "lucide-react";
import ProfilePage from "../../components/shared/ProfilePage";
import COLORS from "../../constants/theme";

const tech = {
  name:       "حازم علي",
  role:       "فني سوفتوير و هاردوير ايفون",
  employeeId: "EMP-001",
  phone:      "1060165515 20+",
  nationalId: "30308060800755",
  email:      "belalgamal1541@gmail.com",
  address:    "221 شارع ملك حفني - ميامي",
  age:        "23",
  hireDate:   "1 May 2021",
};

const stats = [
  {
    title: "إجمالي عمليات الإصلاح",
    value: "284",
    sub:   "+12% this month",
    color: COLORS.primary,
    icon:  <Wrench size={22} />,
  },
  {
    title: "معدل نجاح عملية الصيانة",
    value: "90%",
    sub:   "284 reviews",
    color: COLORS.success,
    icon:  <Star size={22} />,
  },
  {
    title: "معدل سرعة التسليم",
    value: "98%",
    sub:   "High Speed",
    color: "#4c616c",
    icon:  <Zap size={22} />,
  },
  {
    title: "معدل المراجعات",
    value: "10%",
    sub:   "450 reviews",
    color: "#602100",
    icon:  <Star size={22} />,
  },
];

function TechProfile() {
  return (
    <ProfilePage
      user={tech}
      avatarSrc="image/Technician profile.jpg"
      hireDateLabel="تاريخ التعيين"
      stats={stats}
    />
  );
}

export default TechProfile;
