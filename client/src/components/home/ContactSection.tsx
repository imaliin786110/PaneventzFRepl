import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { 
  Phone, 
  Mail, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  AlertCircle,
  Building2,
  Heart,
  Trophy,
  Award,
  Crown,
  ShieldCheck
} from "lucide-react";

// Expanded Contact Form Schema with All Event Dossier Fields
const contactFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid phone number (min 10 digits)."),
  email: z.string().email("Please enter a valid email address."),
  eventType: z.string().min(1, "Please select an event category."),
  eventDate: z.string().optional(),
  city: z.string().min(2, "Please provide the anticipated city or venue."),
  guestCount: z.string().optional(),
  budgetRange: z.string().optional(),
  eventVision: z.string().min(10, "Please share at least 10 characters detailing your event vision.")
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const EVENT_TYPE_MAP: Record<string, string> = {
  corporate: "Corporate Conclave / Annual Summit",
  wedding: "Royal Destination Wedding / Celebration",
  weddings: "Royal Destination Wedding / Celebration",
  "live-entertainment": "Arena Concert / Live Entertainment",
  sports: "Arena Concert / Live Entertainment",
  cultural: "Arena Concert / Live Entertainment",
  "awards-launches": "Awards Gala & Product Launch",
  awards: "Awards Gala & Product Launch",
  launches: "Awards Gala & Product Launch",
  "private-experiences": "Private Soirée / Sovereign Experience",
  private: "Private Soirée / Sovereign Experience"
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionDossier, setSubmissionDossier] = useState<ContactFormValues | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventType: "",
      eventDate: "",
      city: "",
      guestCount: "",
      budgetRange: "",
      eventVision: ""
    },
  });

  // Pre-populate event type if passed via query parameter (e.g., /contact?service=corporate)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const serviceParam = searchParams.get("service")?.toLowerCase();
      if (serviceParam && EVENT_TYPE_MAP[serviceParam]) {
        form.setValue("eventType", EVENT_TYPE_MAP[serviceParam]);
      }
    }
  }, [form]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Format full structured message for backend storage & admin notification
    const formattedMessage = [
      `Event Category: ${data.eventType}`,
      `Anticipated Date: ${data.eventDate || "Flexible / To Be Decided"}`,
      `City / Venue: ${data.city}`,
      `Estimated Guests: ${data.guestCount || "Not specified"}`,
      `Budget Range: ${data.budgetRange || "To be discussed"}`,
      ``,
      `Event Vision & Production Scope:`,
      data.eventVision
    ].join("\n");

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      message: formattedMessage,
      // Pass individual fields as well
      eventDate: data.eventDate || "",
      city: data.city,
      guestCount: data.guestCount || "",
      budgetRange: data.budgetRange || "",
      eventVision: data.eventVision
    };

    try {
      await apiRequest("POST", "/api/contact", payload);
      setSubmissionDossier(data);
      setIsSuccess(true);
      
      toast({
        title: "Event Dossier Transmitted",
        description: "Thank you for reaching out to Pan Eventz. Imran Mirza and our senior production directors will review your brief promptly.",
      });

      form.reset();
    } catch (error: any) {
      console.error("Error submitting event enquiry form:", error);
      setSubmitError("We could not transmit your inquiry automatically. Please reach us directly via WhatsApp or phone.");
      
      toast({
        title: "Transmission Issue",
        description: "Please reach us directly at +91 98213 37523 or on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#050505] relative overflow-hidden border-t border-white/[0.08]">
      {/* Ambient Champagne Lighting Bloom */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E5C378]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[#E5C378] text-[11px] font-mono uppercase tracking-[0.2em] mb-5 shadow-lg shadow-[#E5C378]/5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Commission A Production</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight leading-[1.15] mb-5">
            Bespoke Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E8C1] via-[#E5C378] to-[#C5981B]">Enquiry Dossier</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Provide the details of your upcoming occasion. Founder Imran Mirza and our senior production architects will prepare a comprehensive conceptual blueprint and technical staging proposal.
          </p>
        </div>

        {/* Two-Column Enquiry Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form Column (7 Cols on Desktop) */}
          <div className="lg:col-span-7 bg-[#0D0D10]/95 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-5 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-white">
                  Event Briefing Form
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  All fields marked with an asterisk (*) are required.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5C378]/10 border border-[#E5C378]/30 text-[10px] font-mono text-[#E5C378]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Confidential</span>
              </span>
            </div>

            {/* Success View */}
            {isSuccess && submissionDossier ? (
              <div className="py-10 px-4 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C378] text-black flex items-center justify-center mx-auto shadow-xl shadow-[#E5C378]/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E5C378]">
                    Transmission Confirmed
                  </span>
                  <h4 className="text-2xl font-cinzel font-bold text-white">
                    Event Dossier Received
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong className="text-white font-medium">{submissionDossier.name}</strong>. Your enquiry for a <strong className="text-[#E5C378] font-medium">{submissionDossier.eventType}</strong> in <strong className="text-white font-medium">{submissionDossier.city}</strong> has been transmitted directly to our executive production desk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] max-w-md mx-auto text-left text-xs font-mono space-y-1.5 text-zinc-400">
                  <div><span className="text-zinc-500">Date:</span> {submissionDossier.eventDate || "To be decided"}</div>
                  <div><span className="text-zinc-500">Contact:</span> {submissionDossier.phone} • {submissionDossier.email}</div>
                  <div><span className="text-zinc-500">Guests:</span> {submissionDossier.guestCount || "Not specified"}</div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/918082024787?text=${encodeURIComponent(
                      `Hi Pan Eventz, I just submitted an inquiry for a ${submissionDossier.eventType} in ${submissionDossier.city} under the name ${submissionDossier.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-cinzel font-bold hover:brightness-110 shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up On WhatsApp</span>
                  </a>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSuccess(false);
                      setSubmissionDossier(null);
                    }}
                    className="w-full sm:w-auto border-white/20 text-zinc-300 hover:text-white bg-transparent text-xs font-cinzel rounded-full px-6 py-3"
                  >
                    Submit Another Brief
                  </Button>
                </div>
              </div>
            ) : (
              /* The Main Active Form */
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                  
                  {/* Error Alert if Submission Fails */}
                  {submitError && (
                    <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">{submitError}</p>
                        <p className="text-[11px] text-red-300">
                          Direct Line: <a href="tel:+919821337523" className="underline font-bold">+91 98213 37523</a> • WhatsApp: <a href="https://wa.me/918082024787" target="_blank" rel="noreferrer" className="underline font-bold">+91 80820 24787</a>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Rahul Sharma"
                              className="bg-black/50 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Phone / WhatsApp *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="+91 98213 37523"
                              className="bg-black/50 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 2: Email & Event Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="name@company.com"
                              className="bg-black/50 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Event Category *
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/10 text-white rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0D0D10] border-white/15 text-white">
                              <SelectItem value="Corporate Conclave / Annual Summit">Corporate Conclave / Annual Summit</SelectItem>
                              <SelectItem value="Royal Destination Wedding / Celebration">Royal Destination Wedding / Celebration</SelectItem>
                              <SelectItem value="Arena Concert / Live Entertainment">Arena Concert / Live Entertainment</SelectItem>
                              <SelectItem value="Awards Gala & Product Launch">Awards Gala & Product Launch</SelectItem>
                              <SelectItem value="Private Soirée / Sovereign Experience">Private Soirée / Sovereign Experience</SelectItem>
                              <SelectItem value="Other Bespoke Production">Other Bespoke Production</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 3: Event Date & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Event Date / Timeline
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. November 2026 / Flexible"
                              className="bg-black/50 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            City / Destination *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Mumbai, Udaipur, Delhi, Goa"
                              className="bg-black/50 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 4: Estimated Guest Count & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Estimated Guest Count
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/10 text-white rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm">
                                <SelectValue placeholder="Select Attendance Scale" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0D0D10] border-white/15 text-white">
                              <SelectItem value="Intimate (< 100 Guests)">Intimate (&lt; 100 Guests)</SelectItem>
                              <SelectItem value="100 – 500 Guests">100 – 500 Guests</SelectItem>
                              <SelectItem value="500 – 2,000 Delegates">500 – 2,000 Delegates</SelectItem>
                              <SelectItem value="2,000 – 10,000+ Arena Scale">2,000 – 10,000+ Arena Scale</SelectItem>
                              <SelectItem value="10,000+ Stadium Festival">10,000+ Stadium Festival</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budgetRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                            Estimated Budget Range
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-white/10 text-white rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 h-12 text-sm">
                                <SelectValue placeholder="Select Budget Range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#0D0D10] border-white/15 text-white">
                              <SelectItem value="₹15 Lakhs – ₹35 Lakhs">₹15 Lakhs – ₹35 Lakhs</SelectItem>
                              <SelectItem value="₹35 Lakhs – ₹75 Lakhs">₹35 Lakhs – ₹75 Lakhs</SelectItem>
                              <SelectItem value="₹75 Lakhs – ₹1.5 Crore">₹75 Lakhs – ₹1.5 Crore</SelectItem>
                              <SelectItem value="₹1.5 Crore – ₹5 Crore+">₹1.5 Crore – ₹5 Crore+</SelectItem>
                              <SelectItem value="Custom Enterprise / Sovereign Scale">Custom Enterprise / Sovereign Scale</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-xs font-mono" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 5: Event Vision & Requirements */}
                  <FormField
                    control={form.control}
                    name="eventVision"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-300 text-xs font-mono uppercase tracking-wider">
                          Event Vision & Technical Scope *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Describe your event ambition, desired atmosphere, technical requirements (audio/video, 4K LED, stage, lighting, artist booking), or special VIP protocols..."
                            className="bg-black/50 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:border-[#E5C378] focus:ring-[#E5C378]/20 resize-none text-sm p-3.5"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs font-mono" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5981B] hover:brightness-110 text-black font-cinzel font-bold py-6 rounded-xl shadow-xl shadow-[#E5C378]/20 transition-all flex items-center justify-center gap-2.5 text-xs sm:text-sm uppercase tracking-widest cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        Transmitting Event Brief...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Event Dossier</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Right Column: Direct Channels & Executive Roster (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp Concierge Card */}
            <div className="p-7 rounded-3xl bg-[#0D0D10]/95 backdrop-blur-2xl border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#25D366] uppercase tracking-widest font-bold">
                    Fastest Response
                  </span>
                  <h4 className="text-lg font-cinzel font-bold text-white">
                    WhatsApp Concierge
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Direct instant line with Pan Eventz production coordinators.
                  </p>
                  <a
                    href="https://wa.me/918082024787?text=Hi%20Pan%20Eventz,%20I%20would%20like%20to%20discuss%20an%20upcoming%20event."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-mono text-[#25D366] hover:underline font-bold pt-2"
                  >
                    <span>+91 80820 24787</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct VIP Line Card */}
            <div className="p-7 rounded-3xl bg-[#0D0D10]/95 backdrop-blur-2xl border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#E5C378] uppercase tracking-widest font-bold">
                    Direct Executive Line
                  </span>
                  <h4 className="text-lg font-cinzel font-bold text-white">
                    VIP Telephone Desk
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Direct phone communication for enterprise and sovereign clients.
                  </p>
                  <a
                    href="tel:+919821337523"
                    className="inline-flex items-center gap-2 text-sm font-mono text-zinc-200 hover:text-[#E5C378] transition-colors font-bold pt-2"
                  >
                    <span>+91 98213 37523</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Executive Email Desk Card */}
            <div className="p-7 rounded-3xl bg-[#0D0D10]/95 backdrop-blur-2xl border border-white/[0.08] hover:border-[#E5C378]/40 transition-all duration-500 shadow-2xl relative overflow-hidden group">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#E5C378]/10 border border-[#E5C378]/30 flex items-center justify-center text-[#E5C378] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#E5C378] uppercase tracking-widest font-bold">
                    Official Inquiries & RFPs
                  </span>
                  <h4 className="text-lg font-cinzel font-bold text-white">
                    Executive Email Desk
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    Transmit official RFPs, tender documents, and speaker riders.
                  </p>
                  <a
                    href="mailto:info@paneventz.com"
                    className="inline-flex items-center gap-2 text-sm font-mono text-zinc-200 hover:text-[#E5C378] transition-colors font-bold pt-2"
                  >
                    <span>info@paneventz.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Operations Hubs */}
            <div className="p-7 rounded-3xl bg-[#0D0D10]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#E5C378]" />
                <h4 className="text-base font-cinzel font-bold text-white">
                  Headquarters & Regional Hubs
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-white/[0.06] pt-4">
                <div>
                  <span className="text-[#E5C378] block font-bold">Western Hub</span>
                  <span className="text-zinc-400">Mumbai Central HQ</span>
                </div>
                <div>
                  <span className="text-[#E5C378] block font-bold">Northern Hub</span>
                  <span className="text-zinc-400">Delhi NCR Division</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-zinc-400">
                Pan-India On-Ground Deployment Capabilities across 28 states & destination venues.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
