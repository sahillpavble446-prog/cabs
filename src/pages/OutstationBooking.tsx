import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Car, Shield, Headphones } from "lucide-react";
import { toast } from "sonner";
import { SearchBox } from "@mapbox/search-js-react";
const ACCESS_TOKEN = "pk.eyJ1Ijoic2FoaWwwOThuIiwiYSI6ImNtaDNoYTUyOTJ0Y24yd3MydXNpYjFvdXEifQ.2nqdddpihwREPiO6KBljeA";

const OutstationBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travelers: "1-4",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropLocation: "",
    days: "1",
  });

  const handleBooking = () => {
    if (!formData.pickupDate || !formData.pickupTime || !formData.pickupLocation || !formData.dropLocation) {
      toast.error("Please fill in all required fields");
      return;
    }

    const message = `Hi! I'd like to book an Outstation trip:\nTraveler(s): ${formData.travelers} members\nPickup Location: ${formData.pickupLocation}\nDrop-off Location: ${formData.dropLocation}\nNumber of Days: ${formData.days}\nPickup Date: ${formData.pickupDate}\nPickup Time: ${formData.pickupTime}`;

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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Outstation Booking</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Travel in comfort for your long-distance journeys
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Vehicles</h3>
              <p className="text-muted-foreground">Well-maintained fleet for comfortable long trips</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-muted-foreground">Experienced drivers & comprehensive insurance</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock customer assistance</p>
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
                      <SelectItem value="7-16">7-16 Members</SelectItem>
                      <SelectItem value="17-32">17-32 Members</SelectItem>
                      <SelectItem value="32-53">32-53 Members</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Number of Days
                  </Label>
                  <Select
                    value={formData.days}
                    onValueChange={(value) => setFormData({ ...formData, days: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="4">4 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="6">6 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
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
                    placeholder="Enter pickup location"
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
                    placeholder="Enter drop-off location"
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
                * Price Excluding Toll, Parking & Road Taxes
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Available Vehicles</h2>
            <p className="text-lg text-muted-foreground">We offer Sedans, SUVs, Tempo Travellers and Buses for outstation trips</p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Our fleet includes premium vehicles suitable for long-distance travel. Contact us to learn more about specific models available for your journey.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default OutstationBooking;
