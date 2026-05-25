import React from "react";
import { useCenterReturns } from "../../../hooks/useCenterReturns";
import FiltersDropdownBlade from "../../../components/shared/FiltersDropdownBlade";
import SearchBar from "../../../components/shared/SearchBar";
import DeliveryCard from "../../../components/inventory/DeliveryCard";
import ReturnCard from "../../../components/inventory/ReturnCard";

import { CheckSquare, Trash2, FilePlus } from "lucide-react";

export default function CenterReturns() {
  const {
    searchQuery,
    setSearchQuery,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    statusFilter,
    setStatusFilter,
    stats,
    filteredReturns,
    loading
  } = useCenterReturns();

  return (
    <div className="container-fluid min-vh-100 py-3  " dir="rtl" style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* ─── الهيدر العلوي وعنوان الصفحة ─── */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold" style={{ color: "#BA1A1A", fontSize: "30px" }}>
            إدارة مرتجعات المركز للموردين
          </h2>
          <p className="text-secondary" style={{ fontSize: "0.85rem", marginTop: "-4px" }}>
            مراقبة مرتجعات الورشة و طلبات الإرجاع للموردين
          </p>
        </div>
        
        {/* زر تسجيل أمر إرجاع لعميل */}
        <button 
          className="btn text-white d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
          style={{ backgroundColor: "#BA1A1A", borderRadius: "6px", fontSize: "0.85rem", border: "none" }}
        >
          <FilePlus size={16} />
          تسجيل أمر إرجاع لعميل
        </button>
      </div>

      {/* ─── صف الكروت الإحصائية ─── */}
      {/* ─── صف الكروت الإحصائية ─── */}
<div className="row g-3 mb-5">

  {/* كارت 1: عدد القطع المقبولة للشهر */}
  <div className="col-12 col-md-6 col-lg-3">
    <div className="p-3 rounded-3 d-flex flex-column justify-content-between" style={{ backgroundColor: "#F2F4F6", border: "1px solid #F2F4F6", minHeight: "115px" }}>
      <span className="text-secondary fw-medium" style={{ fontSize: "0.85rem" }}>عدد القطع المقبولة للشهر</span>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3 className="fw-bold m-0" style={{ color: "#1E293B", fontSize: "1.65rem" }}>{stats?.acceptedCount || 0}</h3>
        <div className="p-2 rounded-2 text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: "#BA1A1A", width: "36px", height: "36px" }}>
          <CheckSquare size={18} />
        </div>
      </div>
    </div>
  </div>

  {/* كارت 2: عدد القطع المرفوضة للشهر */}
  <div className="col-12 col-md-6 col-lg-3">
    <div className="p-3 rounded-3 d-flex flex-column justify-content-between" style={{ backgroundColor: "#F2F4F6", border: "1px solid #F2F4F6", minHeight: "115px" }}>
      <span className="text-secondary fw-medium" style={{ fontSize: "0.85rem" }}>عدد القطع المرفوضة للشهر</span>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3 className="fw-bold m-0" style={{ color: "#1E293B", fontSize: "1.65rem" }}>{stats?.rejectedCount || 0}</h3>
        <div className="p-2 rounded-2 text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: "#BA1A1A", width: "36px", height: "36px" }}>
          <Trash2 size={18} />
        </div>
      </div>
    </div>
  </div>

  {/* كارت 3: قيمة المرتجعات المقبولة للشهر */}
  <div className="col-12 col-md-6 col-lg-3">
    <div className="p-3 rounded-3 d-flex flex-column justify-content-between" style={{ backgroundColor: "#F2F4F6", border: "1px solid #F2F4F6", minHeight: "115px" }}>
      <span className="text-secondary fw-medium" style={{ fontSize: "0.85rem" }}>قيمة المرتجعات المقبولة للشهر</span>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3 className="fw-bold m-0" style={{ color: "#1E293B", fontSize: "1.5rem" }}>
          {stats?.acceptedValue?.toLocaleString() || 0} ج.م
        </h3>
        <div className="p-2 rounded-2 text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: "#BA1A1A", width: "36px", height: "36px" }}>
          <CheckSquare size={18} />
        </div>
      </div>
    </div>
  </div>

  {/* كارت 4: قيمة المرتجعات المرفوضة للشهر */}
  <div className="col-12 col-md-6 col-lg-3">
    <div className="p-3 rounded-3 d-flex flex-column justify-content-between" style={{ backgroundColor: "#F2F4F6", border: "1px solid #F2F4F6", minHeight: "115px" }}>
      <span className="text-secondary fw-medium" style={{ fontSize: "0.85rem" }}>قيمة المرتجعات المرفوضة للشهر</span>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3 className="fw-bold m-0" style={{ color: "#1E293B", fontSize: "1.5rem" }}>
          {stats?.rejectedValue?.toLocaleString() || 0} ج.م
        </h3>
        <div className="p-2 rounded-2 text-white d-flex align-items-center justify-content-center" style={{ backgroundColor: "#BA1A1A", width: "36px", height: "36px" }}>
          <Trash2 size={18} />
        </div>
      </div>
    </div>
  </div>

</div>


    <hr style={{ border: "none", borderTop: "1px solid #b8b9b9", margin: "0 0 24px 0" }} />

      {/* ─── شريط التصفية والبحث (السيرش يمين والفلتر شمال) ─── */}
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 p-1">
        
        {/* السيرش مستقر في اليمين ويأخذ أكبر مساحة متاحة */}
        <div className="flex-grow-1" style={{ maxWidth: "75%" }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="البحث برقم المرتجع أو القطعة..."
            width="100%"
          />
        </div>

        {/* الفلتر مستقر تماماً في جهة اليسار مع تمرير الـ State باتجاهين */}
        <div className="flex-shrink-0">
          <FiltersDropdownBlade
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
            onFilter={setStatusFilter}
            selectedStatus={statusFilter}
          />
        </div>

      </div>

      {/* ─── قائمة الكروت ─── */}
      <div className="returns-list-container mt-2">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">جاري التحميل...</span>
            </div>
          </div>
        ) : !filteredReturns || filteredReturns.length === 0 ? (
          <div className="text-center py-5 border rounded-3 bg-light text-muted">
            لا توجد طلبات مرتجعات تطابق خيارات البحث الحالية.
          </div>
        ) : (
          filteredReturns.map((item) => {
            if (item?.cardType === "delivery_card" || item?.status === "in_progress") {
              return (
                <DeliveryCard
                  key={item.id}
                  type={item.type}
                  returnId={item.returnId}
                  returnDate={item.returnDate}
                  itemName={item.itemName}
                  purchaseDate={item.purchaseDate}
                  purchasePrice={item.purchasePrice}
                  locationName={item.locationName}
                  orderSource={item.orderSource}
                  returnDateTech={item.returnDateTech}
                  partNumber={item.partNumber}
                  invoiceNumber={item.invoiceNumber || item.receiptNumber}
                  saleDate={item.saleDate}
                  salePrice={item.salePrice}
                  returnSource={item.returnSource}
                  returnDateCustomer={item.returnDateCustomer}
                  deliveryWorker={item.deliveryWorker}
                  reason={item.reason}
                />
              );
            } else {
              return (
                <ReturnCard
                  key={item.id}
                  type={item.type}
                  returnId={item.returnId}
                  returnDate={item.returnDate}
                  itemName={item.itemName}
                  partNumber={item.partNumber}
                  invoiceNumber={item.invoiceNumber || item.receiptNumber}
                  salePrice={item.salePrice}
                  saleDate={item.saleDate}
                  returnSource={item.returnSource}
                  status={item.status}
                  reason={item.reason}
                />
              );
            }
          })
        )}
      </div>

    </div>
  );
}
