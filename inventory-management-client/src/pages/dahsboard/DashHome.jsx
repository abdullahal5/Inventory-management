import { TiShoppingCart } from "react-icons/ti";
import { FaUserDoctor } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 0,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const data1 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashHome = () => {
  return (
    <div className="px-10">
      <h1 className="text-3xl font-semibold">Inventory Stats</h1>
      <div className="grid grid-cols-12 space-x-5 pt-10">
        <div className="bg-white h-24 col-span-3 rounded-xl px-3 border">
          <div className="flex items-center h-full gap-3">
            <div className="bg-[#e0f2fe] p-3 rounded-full">
              <TiShoppingCart fontSize="35px" color="#0369a1" />
            </div>
            <div>
              <h1 className="text-[#6b7280] text-md font-semibold">
                Total Products
              </h1>
              <span className="text-xl text-[#374151] font-semibold">10</span>
            </div>
          </div>
        </div>
        <div className="bg-white h-24 col-span-3 rounded-xl px-3 border">
          <div className="flex items-center h-full gap-3">
            <div className="bg-[#dcfce7] p-3 rounded-full">
              <RiMoneyDollarCircleLine fontSize="35px" color="#15803d" />
            </div>
            <div>
              <h1 className="text-[#6b7280] text-md font-semibold">
                Total Store Value
              </h1>
              <span className="text-xl text-[#374151] font-semibold">
                $30,785.00
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white h-24 col-span-3 rounded-xl px-3 border">
          <div className="flex items-center h-full gap-3">
            <div className="bg-[#e0e7ff] p-3 rounded-full">
              <FaUserDoctor fontSize="35px" color="#4338ca" />
            </div>
            <div>
              <h1 className="text-[#6b7280] text-md font-semibold">
                Total Company
              </h1>
              <span className="text-xl text-[#374151] font-semibold">7</span>
            </div>
          </div>
        </div>
        <div className="bg-white h-24 col-span-3 rounded-xl px-3 border">
          <div className="flex items-center h-full gap-3">
            <div className="bg-[#fef9c3] p-3 rounded-full">
              <BiCategoryAlt fontSize="35px" color="#a16207" />
            </div>
            <div>
              <h1 className="text-[#6b7280] text-md font-semibold">
                All Categories
              </h1>
              <span className="text-xl text-[#374151] font-semibold">5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 space-x-5 pt-5">
        <div className="bg-white col-span-6 border rounded-xl p-5 ">
          <h1 className="text-[#374151] text-xl font-semibold">
            Today Activity
          </h1>
          <table className="w-full mt-5">
            <tbody>
              <tr className="border-b border-t text-sm">
                <td className="py-2 px-4 ">John</td>
                <td className="py-2 px-4">
                  <span className="bg-gray-200 px-2 py-1 rounded-lg">
                    Added a Product
                  </span>
                </td>
                <td className="py-2 px-4 ">
                  <button className="text-[#eef2ff] bg-[#4f46e5] hover:bg-[#4338ca] px-2 py-1 rounded-lg">
                    See Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-t text-sm">
                <td className="py-2 px-4 ">John</td>
                <td className="py-2 px-4">
                  <span className="bg-gray-200 px-2 py-1 rounded-lg">
                    buy a product
                  </span>
                </td>
                <td className="py-2 px-4 ">
                  <button className="text-[#eef2ff] bg-[#4f46e5] hover:bg-[#4338ca] px-2 py-1 rounded-lg">
                    See Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-t text-sm">
                <td className="py-2 px-4 ">John</td>
                <td className="py-2 px-4">
                  <span className="bg-gray-200 px-2 py-1 rounded-lg">
                    Added a Product
                  </span>
                </td>
                <td className="py-2 px-4 ">
                  <button className="text-[#eef2ff] bg-[#4f46e5] hover:bg-[#4338ca] px-2 py-1 rounded-lg">
                    See Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-t text-sm">
                <td className="py-2 px-4 ">John</td>
                <td className="py-2 px-4">
                  <span className="bg-gray-200 px-2 py-1 rounded-lg">
                    Added a Product
                  </span>
                </td>
                <td className="py-2 px-4 ">
                  <button className="text-[#eef2ff] bg-[#4f46e5] hover:bg-[#4338ca] px-2 py-1 rounded-lg">
                    See Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-t text-sm">
                <td className="py-2 px-4 ">John</td>
                <td className="py-2 px-4">
                  <span className="bg-gray-200 px-2 py-1 rounded-lg">
                    Added a Product
                  </span>
                </td>
                <td className="py-2 px-4 ">
                  <button className="text-[#eef2ff] bg-[#4f46e5] hover:bg-[#4338ca] px-2 py-1 rounded-lg">
                    See Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white col-span-6 border rounded-xl p-5">
          <h1 className="text-[#374151] text-xl font-semibold">Total Health</h1>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data1} // Change data prop to data1 for the PieChart
                nameKey="name" // Correctly specify nameKey to match your data structure
                dataKey="value" // Correctly specify dataKey to match your data structure
                innerRadius={85}
                outerRadius={110}
                cx="40%"
                cy="50%"
                paddingAngle={3}
              >
                {data1.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`} // Update key prop to a unique value
                    fill={COLORS[index % COLORS.length]} // Use COLORS array for fill
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="middle"
                align="right"
                width="30%"
                layout="vertical"
                iconSize={15}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white mb-5 pt-5 border rounded-xl mt-5">
        <h1 className="text-[#374151] text-xl font-semibold pb-5 pl-5">
          Sales Summary
        </h1>
        <AreaChart
          width={1000}
          height={300}
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="1" y1="0" x2="1" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis unit="$" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#colorPv)"
          />
          <Legend />
        </AreaChart>
      </div>
    </div>
  );
};

export default DashHome;
