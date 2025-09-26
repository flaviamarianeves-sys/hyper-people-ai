import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { KeyCollaborator } from "@/types";

interface KeyCollaboratorCardProps {
  collaborators: KeyCollaborator[];
}

export const KeyCollaboratorCard = ({ collaborators }: KeyCollaboratorCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Colaboradores-Chave
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {collaborators.map((collaborator) => (
          <div 
            key={collaborator.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder-${collaborator.id}.jpg`} />
                <AvatarFallback>
                  {collaborator.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{collaborator.name}</p>
                <p className="text-xs text-muted-foreground">{collaborator.role}</p>
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {collaborator.influence}% influência
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {collaborator.connections} conexões
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};