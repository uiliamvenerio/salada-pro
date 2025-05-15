import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UtensilsCrossed, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  ArrowUpRight,
  ArrowDownRight,
  Star
} from 'lucide-react';
import Card from '../components/ui/Card';
import { supabase } from '../supabase';
import { useAuthStore } from '../store/useAuthStore';
import Button from '../components/ui/Button';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { nutritionist } = useAuthStore();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalRecipes: 0,
    totalMenus: 0,
    newClientsThisMonth: 0,
  });
  const [recentClients, setRecentClients] = useState<any[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!nutritionist) return;

      try {
        setIsLoading(true);
        
        // Fetch stats
        const [clientsRes, recipesRes, menusRes, newClientsRes] = await Promise.all([
          supabase
            .from('clients')
            .select('id')
            .eq('nutritionist_id', nutritionist.id)
            .count(),
          supabase
            .from('recipes')
            .select('id')
            .eq('nutritionist_id', nutritionist.id)
            .count(),
          supabase
            .from('menus')
            .select('id')
            .eq('nutritionist_id', nutritionist.id)
            .count(),
          supabase
            .from('clients')
            .select('id')
            .eq('nutritionist_id', nutritionist.id)
            .gte('created_at', new Date(new Date().setDate(1)).toISOString())
            .count(),
        ]);
        
        setStats({
          totalClients: clientsRes.count || 0,
          totalRecipes: recipesRes.count || 0,
          totalMenus: menusRes.count || 0,
          newClientsThisMonth: newClientsRes.count || 0,
        });
        
        // Fetch recent clients
        const { data: recentClientsData } = await supabase
          .from('clients')
          .select('*')
          .eq('nutritionist_id', nutritionist.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        setRecentClients(recentClientsData || []);
        
        // Fetch recent recipes
        const { data: recentRecipesData } = await supabase
          .from('recipes')
          .select('*')
          .eq('nutritionist_id', nutritionist.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        setRecentRecipes(recentRecipesData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [nutritionist]);

  // Sample data for the chart
  const clientGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Clients',
        data: [4, 6, 8, 7, 10, 12],
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 6,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse-soft">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome message */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800">
            Welcome back, {nutritionist?.name?.split(' ')[0] || 'Nutritionist'}
          </h1>
          <p className="text-neutral-500 mt-1">
            Here's an overview of your nutritionist practice
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => {}}
          >
            Export Report
          </Button>
          <Button 
            variant="primary"
            onClick={() => {}}
          >
            Add New Client
          </Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center p-6">
          <div className="bg-primary-100 p-3 rounded-full mr-4">
            <Users className="text-primary-500" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-800">{stats.totalClients}</h3>
            <p className="text-neutral-500 text-sm">Total Clients</p>
          </div>
          <div className="ml-auto flex items-center text-success-500">
            <ArrowUpRight size={16} />
            <span className="text-sm font-medium">12%</span>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="bg-secondary-100 p-3 rounded-full mr-4">
            <UtensilsCrossed className="text-secondary-500" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-800">{stats.totalRecipes}</h3>
            <p className="text-neutral-500 text-sm">Total Recipes</p>
          </div>
          <div className="ml-auto flex items-center text-success-500">
            <ArrowUpRight size={16} />
            <span className="text-sm font-medium">8%</span>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="bg-accent-100 p-3 rounded-full mr-4">
            <Calendar className="text-accent-500" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-800">{stats.totalMenus}</h3>
            <p className="text-neutral-500 text-sm">Active Menus</p>
          </div>
          <div className="ml-auto flex items-center text-error-500">
            <ArrowDownRight size={16} />
            <span className="text-sm font-medium">3%</span>
          </div>
        </Card>
        
        <Card className="flex items-center p-6">
          <div className="bg-success-100 p-3 rounded-full mr-4">
            <TrendingUp className="text-success-500" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-neutral-800">{stats.newClientsThisMonth}</h3>
            <p className="text-neutral-500 text-sm">New Clients (Month)</p>
          </div>
          <div className="ml-auto flex items-center text-success-500">
            <ArrowUpRight size={16} />
            <span className="text-sm font-medium">15%</span>
          </div>
        </Card>
      </div>
      
      {/* Charts and lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Client Growth</h2>
            <div className="text-sm text-neutral-500">Last 6 months</div>
          </div>
          <div className="h-64">
            <Line data={clientGrowthData} options={chartOptions} />
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-800">Top Recipes</h2>
            <Link to="/recipes" className="text-sm text-primary-500 hover:text-primary-600 flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentRecipes.length > 0 ? (
              recentRecipes.map((recipe, index) => (
                <div key={recipe.id} className="flex items-center">
                  <div className="bg-neutral-100 w-10 h-10 rounded-md flex items-center justify-center text-neutral-700 font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800">{recipe.name}</h3>
                    <p className="text-xs text-neutral-500">{Math.floor(Math.random() * 5000) + 1000} kcal</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <div className="flex items-center text-accent-500 mr-2">
                      <Star size={14} fill="#FF9800" stroke="none" />
                      <span className="text-xs ml-1">{(Math.random() * 2 + 3).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-sm py-2">No recipes yet. Add your first recipe!</p>
            )}
          </div>
        </Card>
      </div>
      
      {/* Recent clients */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-neutral-800">Recent Clients</h2>
          <Link to="/clients" className="text-sm text-primary-500 hover:text-primary-600 flex items-center">
            View all <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Goal</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {recentClients.length > 0 ? (
                recentClients.map((client) => (
                  <tr key={client.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-neutral-800">{client.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-600">{client.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-600">{client.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-600">{client.goal || 'Not specified'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-700">Active</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <Link 
                        to={`/clients/${client.id}`}
                        className="text-primary-500 hover:text-primary-700 font-medium text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-neutral-500">
                    No clients yet. Add your first client!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;