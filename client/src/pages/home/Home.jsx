import { useEffect, useState } from "react";
import api from "../../Api/axios";
import CustomAreaChart from "../../components/common/AreaChart";
import MainLayout from "../../layouts/main-layout";
import HomeCard from "./../../components/common/HomeCard";
import { AiTwotoneTags, AiOutlineUser, AiOutlineSkin } from "react-icons/ai";
import { CategoryCards } from "./../../components/categoryCards";
import requireAuth from "../../components/requireAuth";
import useLocale from "../../contexts/LocaleContext";

const HomePage = () => {
  const { t } = useLocale();

  const [catData, setCatData] = useState([]);
  const [prodData, setProdData] = useState([]);
  const [custData, setCustData] = useState([]);

  const getCatReport = async () => {
    const { data: report } = await api.get("/category/report/12");
    const reportData = [];
    Object.keys(report).forEach((month) => {
      reportData.push({ name: month, categories: report[month].length });
    });
    setCatData(reportData);
  };

  const getProductReport = async () => {
    const { data: report } = await api.get("/product/report/12");
    const reportData = [];
    Object.keys(report).forEach((month) => {
      reportData.push({ name: month, products: report[month].length });
    });
    setProdData(reportData);
  };

  const getCustomerReport = async () => {
    const { data: report } = await api.get("/customer/report/12");
    const reportData = [];
    Object.keys(report).forEach((month) => {
      reportData.push({ name: month, customers: report[month].length });
    });
    setCustData(reportData);
  };

  useEffect(() => {
    getCatReport(), getProductReport(), getCustomerReport();
  }, []);

  const catCount = catData.length
    ? catData[catData.length - 1]["categories"]
    : 0;
  const prodCount = prodData.length
    ? prodData[prodData.length - 1]["products"]
    : 0;
  const cusCount = custData.length
    ? custData[custData.length - 1]["customers"]
    : 0;
  return (
    <MainLayout>
      <div className="grid grid-cols-3 gap-4 mx-auto p-3">
        <HomeCard
          title={t("categories")}
          content={catCount}
          Icon={AiTwotoneTags}
        />
        <HomeCard
          title={t("products")}
          content={prodCount}
          Icon={AiOutlineSkin}
        />
        <HomeCard
          title={t("customers")}
          content={cusCount}
          Icon={AiOutlineUser}
        />
      </div>
      <div className="mb-10"></div>
      <div className="grid grid-cols-3 px-1 py-7">
        <CustomAreaChart data={catData} name="categories" />
        <CustomAreaChart data={prodData} name="products" />
        <CustomAreaChart data={custData} name="customers" />
      </div>

      <CategoryCards />
    </MainLayout>
  );
};

export default requireAuth(HomePage);
