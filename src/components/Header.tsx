import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Download, RefreshCw, User } from "lucide-react";
import mosaicLogo from "@/assets/mosaic-logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  onRefresh?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
}

export const Header = ({ onRefresh, onExport, onFilter }: HeaderProps) => {
  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={mosaicLogo} 
              alt="Mosaic-AI Logo" 
              className="h-8 w-12 object-cover rounded"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">Mosaic-AI</h1>
              <Badge variant="secondary" className="text-xs">
                Hub de Hiperpersonalização
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          
          <div className="ml-4 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};