import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  UserPlus, 
  Mail, 
  MoreVertical, 
  Crown, 
  Edit, 
  Trash2,
  Copy,
  Check
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
}

interface ProjectCollaboratorsProps {
  projectId: string;
}

export const ProjectCollaborators = ({ projectId }: ProjectCollaboratorsProps) => {
  const { toast } = useToast();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('viewer');
  const [copied, setCopied] = useState(false);

  // Mock collaborators data - in real app would fetch from Supabase
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/api/placeholder/32/32',
      role: 'owner',
      status: 'active',
      joinedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      avatar: '/api/placeholder/32/32',
      role: 'editor',
      status: 'active',
      joinedAt: '2024-01-20T14:30:00Z'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'viewer',
      status: 'pending',
      joinedAt: '2024-01-22T09:00:00Z'
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'editor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'viewer': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      joinedAt: new Date().toISOString()
    };

    setCollaborators(prev => [...prev, newCollaborator]);
    setInviteEmail("");
    setInviteRole('viewer');
    setIsInviteOpen(false);

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteEmail}`,
    });
  };

  const handleRoleChange = (collaboratorId: string, newRole: 'editor' | 'viewer') => {
    setCollaborators(prev => 
      prev.map(c => 
        c.id === collaboratorId 
          ? { ...c, role: newRole }
          : c
      )
    );

    toast({
      title: "Role Updated",
      description: "Collaborator role has been updated successfully",
    });
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== collaboratorId));
    
    toast({
      title: "Collaborator Removed",
      description: "Collaborator has been removed from the project",
    });
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/projects/${projectId}/invite`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    
    toast({
      title: "Link Copied",
      description: "Invite link copied to clipboard",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const activeCollaborators = collaborators.filter(c => c.status === 'active');
  const pendingCollaborators = collaborators.filter(c => c.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Collaborators</h2>
          <p className="text-muted-foreground">Manage who has access to this project</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyInviteLink}>
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            Copy Invite Link
          </Button>
          
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Collaborator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Collaborator</DialogTitle>
                <DialogDescription>
                  Send an invitation to collaborate on this project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="collaborator@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as 'editor' | 'viewer')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer - Can view project and results</SelectItem>
                      <SelectItem value="editor">Editor - Can edit project and workflow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Collaborators</p>
                <p className="text-2xl font-bold">{collaborators.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeCollaborators.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCollaborators.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Collaborators */}
      <Card>
        <CardHeader>
          <CardTitle>Active Collaborators ({activeCollaborators.length})</CardTitle>
          <CardDescription>
            Team members with access to this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeCollaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                    <AvatarFallback>
                      {collaborator.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{collaborator.name}</p>
                      {collaborator.role === 'owner' && (
                        <Crown className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(collaborator.role)} variant="outline">
                    {collaborator.role}
                  </Badge>
                  <Badge className={getStatusColor(collaborator.status)} variant="outline">
                    {collaborator.status}
                  </Badge>
                  
                  {collaborator.role !== 'owner' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleRoleChange(collaborator.id, collaborator.role === 'editor' ? 'viewer' : 'editor')}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Change to {collaborator.role === 'editor' ? 'Viewer' : 'Editor'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleRemoveCollaborator(collaborator.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {pendingCollaborators.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations ({pendingCollaborators.length})</CardTitle>
            <CardDescription>
              Collaborators who haven't accepted their invitation yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingCollaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {collaborator.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{collaborator.name}</p>
                      <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getRoleColor(collaborator.role)} variant="outline">
                      {collaborator.role}
                    </Badge>
                    <Badge className={getStatusColor(collaborator.status)} variant="outline">
                      {collaborator.status}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Resend Invitation
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleRemoveCollaborator(collaborator.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Invitation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding what each role can do in this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="h-5 w-5 text-yellow-600" />
                <h4 className="font-semibold">Owner</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Full project access</li>
                <li>• Manage collaborators</li>
                <li>• Delete project</li>
                <li>• Change project settings</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Edit className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold">Editor</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Edit project workflow</li>
                <li>• Upload files</li>
                <li>• Generate images</li>
                <li>• Download results</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-gray-600" />
                <h4 className="font-semibold">Viewer</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• View project details</li>
                <li>• View results</li>
                <li>• Download results</li>
                <li>• Add comments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};