import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./AreaChart.module.css";
import useResponsive from "../../../hooks/useResponsive";
import useLocale from "../../../contexts/LocaleContext";

const CustomAreaChart = ({ data, name, color1, color2 }) => {
  const { t } = useLocale();
  const { isMobile } = useResponsive();
  const width = "100%";

  const getColor = (key) => {
    return getComputedStyle(document.documentElement).getPropertyValue(key);
  };
  const c1 = color1 || getColor("--dodgerBlue-1");
  const c2 = color2 || getColor("--dodgerBlue-3");
  const gradiantId = `${name}-gradiant`;
  return (
    <div className="flex flex-col">
      <h1 className={styles.reportHeader}>
        {name} {"report"}
      </h1>
      <ResponsiveContainer width={width} height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradiantId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={c1} stopOpacity={0.8} />
              <stop offset="95%" stopColor={c2} stopOpacity={0} />
            </linearGradient>
            {/* <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient> */}
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          {/* <CartesianGrid strokeDasharray="3 3" visible={false/> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey={name}
            stroke={c1}
            fillOpacity={1}
            fill={`url(#${gradiantId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomAreaChart;
