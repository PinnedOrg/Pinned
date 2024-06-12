import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ClubEventProps {
  imageUrl: string;
  title: string;
  description: string;
}

export function ClubEvent({ imageUrl, title, description }: ClubEventProps) {
  return (
    <Card className="max-w-sm rounded-lg overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
