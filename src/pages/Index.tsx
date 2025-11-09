import { Button } from "@/components/ui/button";
import { Zap, Activity, BarChart3, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Zap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            EnergyMonitor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistema avançado de monitoramento de energia em tempo real. 
            Acompanhe consumo, corrente, tensão e muito mais.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6"
          >
            Acessar Dashboard
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <Activity className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Monitoramento em Tempo Real</h3>
            <p className="text-muted-foreground">
              Acompanhe todas as métricas de energia instantaneamente
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors">
            <BarChart3 className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Análise de Dados</h3>
            <p className="text-muted-foreground">
              Visualize tendências semanais, mensais e semestrais
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card border border-border hover:border-chart-3/50 transition-colors">
            <Shield className="w-12 h-12 text-chart-3 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seguro e Confiável</h3>
            <p className="text-muted-foreground">
              Sistema robusto com autenticação e proteção de dados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
