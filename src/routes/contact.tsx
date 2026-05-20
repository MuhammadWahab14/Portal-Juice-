import { createFileRoute } from "@tanstack/react-router";
import { Mail, Facebook, Linkedin, Instagram } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Portal Juice" },
      { name: "description", content: "Get in touch with Portal Juice — Gateway to Health." },
      { property: "og:title", content: "Contact — Portal Juice" },
      { property: "og:description", content: "Reach out to Portal Juice in Dubai." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="contact-shell relative">
      <Navbar />

      <main className="contact-main pt-[96px] md:pt-[140px]">
        <section className="contact-left fade-in">
          <p className="contact-intro">
            Do you want to get in touch?<br />
            We would love to hear from you. Give us a call or drop an email at{" "}
            <a href="mailto:hello@portal-juice.com" className="contact-link">hello@portal-juice.com</a>{" "}
            and we will get back soon.
          </p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field"><label htmlFor="name">Name*</label><input id="name" type="text" required /></div>
            <div className="field"><label htmlFor="email">Email*</label><input id="email" type="email" required /></div>
            <div className="field"><label htmlFor="subject">Subject</label><input id="subject" type="text" /></div>
            <div className="field field-message"><label htmlFor="message">Message*</label><textarea id="message" rows={3} required /></div>
            <button type="submit" className="send-btn">SEND</button>
          </form>
        </section>

        <section className="contact-right fade-in">
          <div className="map-frame">
            <iframe
              title="Portal Juice location"
              src="https://www.google.com/maps?q=Business+Bay+Dubai&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="connect-block">
            <h3 className="connect-title">CONNECT</h3>
            <p className="phone-line"><span>+971586072026</span><span className="phone-region">UAE</span></p>
            <div className="socials">
              <a href="mailto:hello@portal-juice.com" aria-label="Email"><Mail size={16} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}