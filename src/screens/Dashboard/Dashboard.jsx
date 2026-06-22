import React, { useState, useEffect } from "react";
import { Users, Megaphone, FileText, DollarSign, Activity } from "lucide-react";

import {
  ActivityFeed,
  CityChart,
  CropDistributionChart,
  DashboardText,
  RecentFarmersTable,
  StatusCard,
} from "../../components";
import useFarmer from "../../hooks/useFarmer";
import useBlogs from "../../hooks/useBlogs";
import useAds from "../../hooks/useAds";

const Dashboard = () => {
  // Backend se aayega
  const [stats, setStats] = useState([]);
  const [recentFarmers, setRecentFarmers] = useState([]);
  const { getFarmers } = useFarmer();
  const { getBlogs } = useBlogs();
  const { getAds } = useAds();

  useEffect(() => {
    // Mock API fetch for stats
    const fetchStats = async () => {
      try {
        const [farmerData, blogData, adsData] = await Promise.all([
          getFarmers(),
          getBlogs(),
          getAds(),
        ]);

        setRecentFarmers(
          [...farmerData]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 4),
        );
        setStats([
          {
            title: "Total Farmers",
            value: farmerData.length,
            icon: Users,
            gradient: "from-primary to-accent",
          },
          {
            title: "Active ADS",
            value: adsData.length,
            icon: Megaphone,
            gradient: "from-info to-blue-400",
          },
          {
            title: "Total Blogs",
            value: blogData.length,
            icon: FileText,
            gradient: "from-warning to-amber-400",
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-7">
      <DashboardText
        text="Dashboard"
        para="Welcome back! Here's your farm operations overview."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 ">
        {stats.map((stat, index) => (
          <StatusCard
            key={stat.title}
            index={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
          />
        ))}
      </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 ">
      <CityChart />
        </div>
      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Recent Farmers
            </h2>
            <p className="text-sm text-muted-foreground">
              Latest registrations from mobile app
            </p>
          </div>
          <Activity className="h-5 w-5 text-muted-foreground" />
        </div>

        <RecentFarmersTable data={recentFarmers} />
      </div>
    </div>
  );
};

export default Dashboard;
