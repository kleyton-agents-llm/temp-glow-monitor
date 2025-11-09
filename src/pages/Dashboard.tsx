import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Zap, Battery, TrendingUp, Thermometer, Power, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Period = "weekly" | "monthly" | "semester";

const generateMockData = (period: Period, metric: string) => {
  const dataPoints = period === "weekly" ? 7 : period === "monthly" ? 30 : 180;
  const baseValue = Math.random() * 100 + 50;
  
  return Array.from({ length: dataPoints }, (_, i) => ({
    name: period === "weekly" 
      ? `Dia ${i + 1}` 
      : period === "monthly" 
      ? `Dia ${i + 1}` 
      : `Mês ${Math.floor(i / 30) + 1}`,
    value: baseValue + Math.random() * 30 - 15,
  }));
};

const MetricCard = ({ 
  title, 
  icon: Icon, 
  unit, 
  color 
}: { 
  title: string; 
  icon: any; 
  unit: string; 
  color: string;
}) => {
  const [period, setPeriod] = useState<Period>("weekly");
  const data = generateMockData(period, title);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{unit}</CardDescription>
            </div>
          </div>
          <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="semester">Semestral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={`hsl(var(--${color.includes('primary') ? 'primary' : color.includes('accent') ? 'accent' : 'chart-3'}))`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">EnergyMonitor</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard de Monitoramento</h2>
          <p className="text-muted-foreground">Acompanhe os dados de energia em tempo real</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricCard 
            title="Corrente"
            icon={Activity}
            unit="Amperes (A)"
            color="bg-primary/10 text-primary"
          />
          <MetricCard 
            title="Tensão"
            icon={Zap}
            unit="Volts (V)"
            color="bg-accent/10 text-accent"
          />
          <MetricCard 
            title="Energia"
            icon={Battery}
            unit="Quilowatt-hora (kWh)"
            color="bg-chart-3/10 text-chart-3"
          />
          <MetricCard 
            title="Consumo"
            icon={TrendingUp}
            unit="Watts (W)"
            color="bg-chart-4/10 text-chart-4"
          />
          <MetricCard 
            title="Temperatura"
            icon={Thermometer}
            unit="Celsius (°C)"
            color="bg-chart-5/10 text-chart-5"
          />
          <MetricCard 
            title="Potência"
            icon={Power}
            unit="Watts (W)"
            color="bg-chart-6/10 text-chart-6"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
