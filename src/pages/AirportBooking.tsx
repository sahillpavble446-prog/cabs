import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Plane, CheckCircle, Clock3 } from "lucide-react";
import { toast } from "sonner";
import { SearchBox } from "@mapbox/search-js-react";
const ACCESS_TOKEN = "pk.eyJ1Ijoic2FoaWwwOThuIiwiYSI6ImNtaDNoYTUyOTJ0Y24yd3MydXNpYjFvdXEifQ.2nqdddpihwREPiO6KBljeA";

const AirportBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travelers: "1-4",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropLocation: "",
  });

  const popularRoutes = [
    { from: "Kempegowda International Airport", to: "MG Road, Bangalore", time: "45 mins" },
    { from: "Koramangala", to: "Kempegowda International Airport", time: "50 mins" },
    { from: "Whitefield", to: "Kempegowda International Airport", time: "55 mins" },
    { from: "Electronic City", to: "Kempegowda International Airport", time: "60 mins" },
  ];

  const handleBooking = () => {
    if (!formData.pickupDate || !formData.pickupTime || !formData.pickupLocation || !formData.dropLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    const message = `Hi! I'd like to book an Airport Transfer:\nTraveler(s): ${formData.travelers} members\nPickup Location: ${formData.pickupLocation}\nDrop-off Location: ${formData.dropLocation}\nPickup Date: ${formData.pickupDate}\nPickup Time: ${formData.pickupTime}`;

    const whatsappUrl = `https://wa.me/919900987878?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-12 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-white hover:text-white/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Airport Transfer</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Reliable and punctual airport pickup & drop services
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flight Tracking</h3>
              <p className="text-muted-foreground">Monitor your flight status in real-time</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock3 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always On Time</h3>
              <p className="text-muted-foreground">Punctual pickup for hassle-free travel</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meet & Greet</h3>
              <p className="text-muted-foreground">Professional driver assistance at terminal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-center">Complete Your Booking</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of Travelers
                  </Label>
                  <Select
                    value={formData.travelers}
                    onValueChange={(value) => setFormData({ ...formData, travelers: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-4">1-4 Members</SelectItem>
                      <SelectItem value="5-7">5-7 Members</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Pickup Location
                  </Label>
                  <SearchBox
                    accessToken={ACCESS_TOKEN}
                    value={formData.pickupLocation}
                    onChange={(value) => setFormData(prev => ({ ...prev, pickupLocation: value }))}
                    onRetrieve={(result) => {
                      const placeName = result.features[0]?.place_name;
                      if (placeName) {
                        setFormData(prev => ({ ...prev, pickupLocation: placeName }));
                      }
                    }}
                    options={{ country: "IN" }}
                    placeholder="Enter pickup location (e.g., Airport or your address)"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Drop-off Location
                  </Label>
                  <SearchBox
                    accessToken={ACCESS_TOKEN}
                    value={formData.dropLocation}
                    onChange={(value) => setFormData(prev => ({ ...prev, dropLocation: value }))}
                    onRetrieve={(result) => {
                      const placeName = result.features[0]?.place_name;
                      if (placeName) {
                        setFormData(prev => ({ ...prev, dropLocation: placeName }));
                      }
                    }}
                    options={{ country: "IN" }}
                    placeholder="Enter drop-off location (e.g., your address or Airport)"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Pickup Date
                  </Label>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Pickup Time
                  </Label>
                  <input
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  />
                </div>
              </div>

              <Button
                variant="accent"
                size="lg"
                className="w-full"
                onClick={handleBooking}
              >
                Confirm Booking via WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                * Fixed fare, no hidden charges
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Airport Routes</h2>
            <p className="text-lg text-muted-foreground">Frequently traveled routes</p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <Plane className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{route.from}</p>
                    <p className="text-sm text-muted-foreground mb-2">to {route.to}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Approx. {route.time}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Available Vehicles</h2>
            <p className="text-lg text-muted-foreground">We offer Sedans, Premium Sedans, and SUVs for airport transfers</p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              Our fleet includes comfortable vehicles perfect for airport transportation. Contact us to learn more about specific models available for your journey.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default AirportBooking;
