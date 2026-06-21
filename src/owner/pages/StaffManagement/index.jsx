import React from "react";
import { UserPlus, AlertCircle, Wrench, CheckCircle2 } from "lucide-react";

import PageHeader        from "../../../components/shared/PageHeader";
import EmployeesFilterBar from "./EmployeesFilterBar";
import EmployeesTable     from "./EmployeesTable";
import EmployeeStatCard   from "./EmployeeStatCard";
import useEmployees        from "../../../hooks/useEmployees";

/**
 * StaffManagementPage — صفحة إدارة الموظفين (المالك)
 *
 * Props:
 *  - onViewEmployee : callback(employee) — اختياري، لعرض تفاصيل الموظف
 */
const StaffManagementPage = ({ onViewEmployee }) => {
  const {
    records, summary, loading,
    search, setSearch,
    roleFilter, setRoleFilter,
    roleOptions,
    page, setPage,
    PAGE_SIZE, totalCount,
  } = useEmployees();

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
      <div className="container-fluid p-4">

        <PageHeader
          title="فهرس الموظفين"
          subtitle="استعرض وأدر سجلات الموظفين، الأدوار، وصلاحيات الوصول ضمن المؤسسة."
        />

        {/* ══ Stat Cards ══ */}
        <div className="d-flex gap-3 mb-4 flex-wrap">
          <EmployeeStatCard
            badgeLabel="نشط"
            badgeColor="#6d5e00"
            badgeBg="#f9e37a"
            icon={<CheckCircle2 size={16} color="#6d5e00" />}
            iconBg="#f9e37a"
            accentColor="#f9e37a"
            value={summary?.activeAccounts ?? 0}
            label="حسابات نشطة لموظفين"
            note="موظفون فعليون"
            noteColor="#6b7280"
          />
          <EmployeeStatCard
            badgeLabel="فني"
            badgeColor="#0d47a1"
            badgeBg="#d9e2ff"
            icon={<Wrench size={16} color="#0d47a1" />}
            iconBg="#d9e2ff"
            accentColor="#0d47a1"
            value={summary?.techCount ?? 0}
            label="موظفون في دور الفني"
            note="لديك وفرة في فنيين هاردوير"
            noteColor="#6b7280"
          />
          <EmployeeStatCard
            badgeLabel="عامل توصيل"
            badgeColor="#9c1c1c"
            badgeBg="#fbdcdc"
            icon={<AlertCircle size={16} color="#ba1a1a" />}
            iconBg="#fbdcdc"
            accentColor="#ba1a1a"
            value={summary?.deliveryCount ?? 0}
            label="موظف توصيل"
            note="يتطلب اهتماماً فورياً"
            noteColor="#ba1a1a"
          />
        </div>

        <EmployeesFilterBar
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          roleOptions={roleOptions}
          search={search}
          setSearch={setSearch}
          actionLabel="إضافة موظف جديد"
          actionIcon={<UserPlus size={16} />}
          onAction={() => {}}
        />

        {/* ══ Table ══ */}
        <div
          className="bg-white shadow-sm"
          style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #eee" }}
        >
          <EmployeesTable
            records={records}
            loading={loading}
            page={page}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            onView={onViewEmployee}
          />
        </div>

      </div>
    </div>
  );
};

export default StaffManagementPage;
