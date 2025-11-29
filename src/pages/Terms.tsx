const Terms = () => {
  return (
    <main className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Agreement to Terms</h2>
              <p>
                By accessing and using Drake Fitness services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Membership Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Memberships are month-to-month with no long-term contracts</li>
                <li>30 days notice is required for cancellation</li>
                <li>Membership fees are non-refundable</li>
                <li>We reserve the right to modify pricing with 30 days notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Assumption of Risk</h2>
              <p>
                Physical exercise involves inherent risks. By participating in Drake Fitness classes and programs, you acknowledge and assume all risks associated with physical activity. You should consult with a physician before beginning any exercise program.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Code of Conduct</h2>
              <p>Members are expected to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Treat coaches and other members with respect</li>
                <li>Maintain personal hygiene and cleanliness</li>
                <li>Follow facility rules and coach instructions</li>
                <li>Use equipment properly and safely</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Cancellation Policy</h2>
              <p>
                Class reservations can be cancelled up to 12 hours before the scheduled start time. Late cancellations or no-shows may result in loss of class credit for limited memberships.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Liability Waiver</h2>
              <p>
                Members agree to waive and release Drake Fitness, its owners, coaches, and employees from any liability for injuries or damages arising from participation in fitness activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 uppercase">Contact Information</h2>
              <p>
                For questions about these terms, please contact us at:
                <br />
                <a href="mailto:hello@drakefitness.com" className="text-primary hover:underline">hello@drakefitness.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Terms;
