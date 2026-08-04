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

import Card from "../../components/ui/Card";

function ManagerAnalyticsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const analytics = await getCategoryAnalytics();
      setData(analytics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-border border-t-brand-900" />
          <p className="mt-4 text-sm font-medium text-brand-500">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-brand-900">
          Category Distribution
        </h2>
        <p className="mt-0.5 text-sm text-brand-500">
          Visual breakdown of approved expense reimbursements categorized by type.
        </p>
      </div>

      <Card className="p-6">
        <div className="h-[400px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border, #e2e8f0)" vertical={false} />
              <XAxis 
                dataKey="category" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "0.75rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  fontSize: "13px",
                }}
                formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Approved Amount"]}
              />
              <Bar
                dataKey="totalAmount"
                fill="currentColor"
                className="text-brand-900"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

export default ManagerAnalyticsPage;