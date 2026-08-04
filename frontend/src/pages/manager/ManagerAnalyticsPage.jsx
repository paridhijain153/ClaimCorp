import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  getCategoryAnalytics,
} from "../../services/manager.service";

function ManagerAnalyticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const analytics =
        await getCategoryAnalytics();

      setData(analytics);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-slate-500">
          Approved expenses by category.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="totalAmount"
              fill="#2563eb"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ManagerAnalyticsPage;