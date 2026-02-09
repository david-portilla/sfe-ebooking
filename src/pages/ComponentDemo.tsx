import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Container, Grid } from '../components/ui/layout';

/**
 * Component Demo Page
 * Temporary page to showcase UI components.
 * This will be replaced with actual user management features.
 */
export function ComponentDemo() {
  return (
    <Container className="py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        User Management Dashboard
      </h1>

      <Grid>
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-semibold">UI Components Demo</h2>
          <div className="mb-6 flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="space-y-4">
            <Input label="Username" placeholder="Enter username" />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              description="We'll never share your email."
            />
          </div>
        </Card>
      </Grid>
    </Container>
  );
}
