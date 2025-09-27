import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Download, Eye, Trash2 } from "lucide-react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { useAuth } from "@/hooks/useAuth";

export const GenerationHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getUserHistory } = useImageGeneration();
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const userHistory = await getUserHistory();
        setHistory(userHistory || []);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user, getUserHistory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatGenerationType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Generation History</h3>
          <p className="text-muted-foreground">
            Your generated images will appear here once you start creating them.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Generations</h3>
        <Badge variant="outline">{history.length} total</Badge>
      </div>

      <div className="space-y-3">
        {history.slice(0, 10).map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">
                      {formatGenerationType(item.generation_type)}
                    </h4>
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                    {item.processing_time_seconds && (
                      <span className="text-xs text-muted-foreground">
                        {item.processing_time_seconds}s
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>

                  {item.generated_images && item.generated_images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {item.generated_images.slice(0, 3).map((img: any, idx: number) => (
                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <img 
                            src={img.image_url} 
                            alt={`Generated image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {item.generated_images.length > 3 && (
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-xs font-medium">
                          +{item.generated_images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {item.status === 'completed' && (
                    <>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};