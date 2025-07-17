import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Event, Booking } from '@/types';
import { upcomingEvents } from '@/data/mockData';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState<Event[]>(upcomingEvents);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    date: '',
    maleFee: '',
    femaleFee: '',
    facilities: '',
    distance: '',
    trekType: 'Easy' as const,
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleLogin = () => {
    if (password === 'safarnama123') {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to Safarnama Admin Panel"
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive"
      });
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEvent.name || !newEvent.location || !newEvent.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      maleFee: parseInt(newEvent.maleFee),
      femaleFee: parseInt(newEvent.femaleFee),
      facilities: newEvent.facilities.split(',').map(f => f.trim()),
      image: '/placeholder.svg'
    };

    setEvents([...events, event]);
    setNewEvent({
      name: '',
      location: '',
      date: '',
      maleFee: '',
      femaleFee: '',
      facilities: '',
      distance: '',
      trekType: 'Easy',
      description: ''
    });

    toast({
      title: "Event Added",
      description: `${event.name} has been added successfully`
    });
  };

  const getTotalRevenue = () => {
    return bookings.reduce((total, booking) => {
      const event = events.find(e => e.id === booking.eventId);
      if (!event) return total;
      const fee = booking.gender === 'Female' ? event.femaleFee : event.maleFee;
      return total + (fee * booking.people);
    }, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Admin Access</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button onClick={handleLogin} className="w-full" variant="adventure">
                Login
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Demo password: safarnama123
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{events.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-green">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sunset-orange">₹{getTotalRevenue().toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mountain-blue">
                {bookings.reduce((total, booking) => total + booking.people, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="events">Manage Events</TabsTrigger>
            <TabsTrigger value="bookings">View Bookings</TabsTrigger>
            <TabsTrigger value="gallery">Gallery Upload</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add New Event */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Event</CardTitle>
                  <CardDescription>Create a new adventure for your community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddEvent} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Event Name *</Label>
                        <Input
                          id="name"
                          value={newEvent.name}
                          onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maleFee">Male Fee</Label>
                        <Input
                          id="maleFee"
                          type="number"
                          value={newEvent.maleFee}
                          onChange={(e) => setNewEvent({...newEvent, maleFee: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="femaleFee">Female Fee</Label>
                        <Input
                          id="femaleFee"
                          type="number"
                          value={newEvent.femaleFee}
                          onChange={(e) => setNewEvent({...newEvent, femaleFee: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="distance">Distance</Label>
                        <Input
                          id="distance"
                          value={newEvent.distance}
                          onChange={(e) => setNewEvent({...newEvent, distance: e.target.value})}
                          placeholder="e.g., 15km"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trekType">Trek Type</Label>
                        <Select value={newEvent.trekType} onValueChange={(value) => setNewEvent({...newEvent, trekType: value as any})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facilities">Facilities (comma-separated)</Label>
                      <Input
                        id="facilities"
                        value={newEvent.facilities}
                        onChange={(e) => setNewEvent({...newEvent, facilities: e.target.value})}
                        placeholder="Guide, Meals, Equipment, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" variant="adventure" className="w-full">
                      Add Event
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Current Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Events</CardTitle>
                  <CardDescription>Manage existing events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{event.name}</h3>
                          <Badge variant="secondary">{event.trekType}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        <p className="text-sm">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-sm">Fee: ₹{event.maleFee} (M) / ₹{event.femaleFee} (F)</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>View and manage customer bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No bookings yet</p>
                  ) : (
                    bookings.map((booking) => {
                      const event = events.find(e => e.id === booking.eventId);
                      const fee = event ? (booking.gender === 'Female' ? event.femaleFee : event.maleFee) : 0;
                      const totalFee = fee * booking.people;
                      
                      return (
                        <div key={booking.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{booking.name}</h3>
                              <p className="text-sm text-muted-foreground">{event?.name || 'Unknown Event'}</p>
                            </div>
                            <Badge variant="secondary">₹{totalFee.toLocaleString()}</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <p><span className="font-medium">Gender:</span> {booking.gender}</p>
                            <p><span className="font-medium">People:</span> {booking.people}</p>
                            <p><span className="font-medium">WhatsApp:</span> {booking.whatsapp}</p>
                            <p><span className="font-medium">Pay After:</span> {booking.payAfterEvent ? 'Yes' : 'No'}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Booked: {new Date(booking.createdAt).toLocaleString()}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Upload and organize event photos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <div className="text-4xl mb-4">📸</div>
                    <h3 className="text-lg font-medium mb-2">Upload Photos</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop photos here or click to browse
                    </p>
                    <Button variant="outline">
                      Choose Files
                    </Button>
                  </div>
                  
                  <div className="text-center text-muted-foreground">
                    <p>Feature coming soon! For now, photos can be managed through the file system.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;