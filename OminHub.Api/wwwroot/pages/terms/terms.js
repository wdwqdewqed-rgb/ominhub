import { Router } from "../../utils/router.js";

function renderTerms(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1>OMINHUB Terms of Service</h1>
        <p class="section-subtitle">Last Modified: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div class="terms-navigation">
          <div class="terms-toc">
            <h3>Table of Contents</h3>
            <ul>
              <li><a href="#section-acceptance">1. Acceptance of Terms</a></li>
              <li><a href="#section-age">2. Age Restriction & Eligibility</a></li>
              <li><a href="#section-account">3. Account Responsibilities</a></li>
              <li><a href="#section-content">4. Content Guidelines & Restrictions</a></li>
              <li><a href="#section-verification">5. Age & Identity Verification</a></li>
              <li><a href="#section-monetization">6. Monetization & Payouts</a></li>
              <li><a href="#section-uploads">7. Uploader Requirements</a></li>
              <li><a href="#section-prohibited">8. Prohibited Activities</a></li>
              <li><a href="#section-dmca">9. DMCA & Copyright</a></li>
              <li><a href="#section-privacy">10. Privacy & Data Security</a></li>
              <li><a href="#section-liability">11. Liability & Disclaimer</a></li>
              <li><a href="#section-termination">12. Termination</a></li>
              <li><a href="#section-jurisdiction">13. Jurisdiction & Governing Law</a></li>
              <li><a href="#section-contact">14. Contact Information</a></li>
            </ul>
          </div>
        </div>
        
        <div class="terms-content">
          <div class="terms-section" id="section-acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing, using, or visiting OMINHUB (the "Platform"), including any of its Content, functionalities, and services, you signify your agreement to these Terms of Service ("Terms"), our Privacy Policy, and all other applicable policies and guidelines incorporated herein by reference.</p>
            
            <div class="terms-highlight">
              <div class="terms-highlight-icon">⚠️</div>
              <div class="terms-highlight-content">
                <h4>Important Notice</h4>
                <p>These Terms constitute a legally binding agreement between you and OMINHUB. If you do not agree to any of these Terms, please do not access or use this Platform.</p>
              </div>
            </div>
            
            <p>We may amend these Terms from time to time. When we do, we will provide reasonable advance notice through platform notifications or email. Your continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.</p>
          </div>
          
          <div class="terms-section" id="section-age">
            <h2>2. Age Restriction & Eligibility</h2>
            <p>You affirm that you are at least <strong>18 years of age</strong> (or the age of majority in your jurisdiction) and are fully competent to enter into these Terms.</p>
            
            <div class="terms-grid">
              <div class="terms-grid-item">
                <div class="terms-grid-icon">👤</div>
                <div class="terms-grid-content">
                  <h4>Viewer Requirements</h4>
                  <p>All viewers must self-certify their age during registration. We may implement additional age verification measures as required by law.</p>
                </div>
              </div>
              
              <div class="terms-grid-item">
                <div class="terms-grid-icon">🎬</div>
                <div class="terms-grid-content">
                  <h4>Creator Requirements</h4>
                  <p>All creators must undergo mandatory age and identity verification before uploading any content.</p>
                </div>
              </div>
              
              <div class="terms-grid-item">
                <div class="terms-grid-icon">🌍</div>
                <div class="terms-grid-content">
                  <h4>Geographic Restrictions</h4>
                  <p>You represent that your jurisdiction does not prohibit access to adult content. Some regions may be restricted based on local laws.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="terms-section" id="section-account">
            <h2>3. Account Responsibilities</h2>
            <p>You are solely responsible for:</p>
            
            <ul class="terms-list">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and current registration information</li>
              <li>Reporting unauthorized access immediately</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
            
            <div class="terms-warning">
              <h4>Account Security Notice</h4>
              <p>We will never ask for your password via email. Use strong, unique passwords and enable two-factor authentication when available.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-content">
            <h2>4. Content Guidelines & Restrictions</h2>
            
            <div class="creator-two-col" style="margin: 20px 0;">
              <div class="creator-two-col-main">
                <div class="terms-allowed">
                  <h3>✅ Allowed Content</h3>
                  <ul>
                    <li><strong>Consensual Adult Entertainment:</strong> All participants must be verified adults</li>
                    <li><strong>Artistic Nudity:</strong> Non-sexual artistic expression</li>
                    <li><strong>Fetish/BDSM Content:</strong> With proper consent and tagging</li>
                    <li><strong>Adult Education:</strong> Sex-positive educational content</li>
                    <li><strong>Custom Content:</strong> Personalized content for subscribers</li>
                  </ul>
                </div>
              </div>
              
              <div class="creator-two-col-side">
                <div class="terms-prohibited">
                  <h3>🚫 Strictly Prohibited</h3>
                  <ul>
                    <li><strong>Child Sexual Abuse Material (CSAM):</strong> Zero tolerance policy</li>
                    <li><strong>Non-Consensual Content:</strong> Including revenge porn</li>
                    <li><strong>Extreme Violence/Gore:</strong> Content depicting real harm</li>
                    <li><strong>Bestiality:</strong> Absolutely prohibited</li>
                    <li><strong>Illegal Activities:</strong> Including drug production, weapons</li>
                    <li><strong>Hate Speech:</strong> Racist, homophobic, or discriminatory content</li>
                    <li><strong>Minors or Youth-Like Content:</strong> Even if simulated</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="terms-important">
              <h4>Mandatory Content Tagging</h4>
              <p>All content must be accurately tagged with appropriate categories, including: Explicit, Nudity, Fetish, Educational, etc. Failure to tag content accurately may result in removal.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-verification">
            <h2>5. Age & Identity Verification</h2>
            
            <div class="verification-process">
              <div class="verification-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>Document Submission</h4>
                  <p>Government-issued ID with photo and date of birth</p>
                </div>
              </div>
              
              <div class="verification-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>Biometric Verification</h4>
                  <p>Selfie comparison with ID document (performed by third-party service)</p>
                </div>
              </div>
              
              <div class="verification-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>Background Check</h4>
                  <p>Verification against prohibited persons databases</p>
                </div>
              </div>
              
              <div class="verification-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>Ongoing Compliance</h4>
                  <p>Regular re-verification may be required</p>
                </div>
              </div>
            </div>
            
            <div class="terms-note">
              <h4>Record Keeping Requirements</h4>
              <p>Creators must maintain records verifying the age of all individuals appearing in their content for a minimum of <strong>7 years</strong> from the date of production, in compliance with 18 U.S.C. § 2257 and similar regulations.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-monetization">
            <h2>6. Monetization & Payouts</h2>
            
            <div class="monetization-details">
              <div class="monetization-item">
                <h4>💰 Revenue Share</h4>
                <p>Creators receive <strong>80%</strong> of all revenue generated through their content.</p>
              </div>
              
              <div class="monetization-item">
                <h4>📅 Payout Schedule</h4>
                <p>Monthly payouts processed around the <strong>1st of each month</strong> for the previous month's earnings.</p>
              </div>
              
              <div class="monetization-item">
                <h4>💵 Minimum Threshold</h4>
                <p>Minimum payout amount: <strong>$50 USD</strong>. Amounts below this carry over to the next month.</p>
              </div>
              
              <div class="monetization-item">
                <h4>🌐 Payment Methods</h4>
                <p>Bank transfer, cryptocurrency (USDT/USDC), PayPal, and other e-wallets (availability varies by region).</p>
              </div>
            </div>
            
            <div class="tax-notice">
              <h4>Tax Responsibility</h4>
              <p>Creators are solely responsible for reporting their income and paying applicable taxes according to their local laws. We may issue tax forms (1099 in the US) when required by law.</p>
            </div>
            
            <div class="terms-warning">
              <h4>Payout Conditions</h4>
              <p>Payouts may be withheld if you violate these Terms, if there are chargebacks, or if we suspect fraudulent activity. We reserve the right to withhold payment during investigation of potential violations.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-uploads">
            <h2>7. Uploader Requirements</h2>
            
            <p>As a content uploader (Creator, Model, or Verified Uploader), you represent and warrant that:</p>
            
            <div class="requirements-list">
              <div class="requirement-item">
                <div class="requirement-icon">✅</div>
                <div class="requirement-content">
                  <h4>Consent Documentation</h4>
                  <p>You have obtained written consent and model releases from every individual appearing in your content.</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="requirement-icon">✅</div>
                <div class="requirement-content">
                  <h4>Age Verification</h4>
                  <p>You have verified that every individual was at least 18 years old at the time of production.</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="requirement-icon">✅</div>
                <div class="requirement-content">
                  <h4>Background Checks</h4>
                  <p>No individual appearing in your content has been convicted of sexual assault, exploitation of minors, trafficking, or related offenses.</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="requirement-icon">✅</div>
                <div class="requirement-content">
                  <h4>Original Content</h4>
                  <p>Content is original and not duplicated from other uploaders.</p>
                </div>
              </div>
              
              <div class="requirement-item">
                <div class="requirement-icon">✅</div>
                <div class="requirement-content">
                  <h4>Legal Compliance</h4>
                  <p>Content complies with all applicable laws and does not infringe third-party rights.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="terms-section" id="section-prohibited">
            <h2>8. Prohibited Activities</h2>
            
            <p>You agree not to engage in any of the following prohibited activities:</p>
            
            <div class="prohibited-grid">
              <div class="prohibited-card">
                <div class="prohibited-icon">🚫</div>
                <h4>Fraud & Scams</h4>
                <ul>
                  <li>Buying or selling fake views/likes</li>
                  <li>Phishing or identity theft</li>
                  <li>Chargeback fraud</li>
                </ul>
              </div>
              
              <div class="prohibited-card">
                <div class="prohibited-icon">🚫</div>
                <h4>Harassment</h4>
                <ul>
                  <li>Cyberbullying or stalking</li>
                  <li>Threats or intimidation</li>
                  <li>Hate speech</li>
                </ul>
              </div>
              
              <div class="prohibited-card">
                <div class="prohibited-icon">🚫</div>
                <h4>Platform Abuse</h4>
                <ul>
                  <li>Spamming or excessive posting</li>
                  <li>Using bots or automation</li>
                  <li>Circumventing security measures</li>
                </ul>
              </div>
              
              <div class="prohibited-card">
                <div class="prohibited-icon">🚫</div>
                <h4>Commercial Exploitation</h4>
                <ul>
                  <li>Using platform for prostitution</li>
                  <li>Human or sex trafficking</li>
                  <li>Unauthorized commercial use</li>
                </ul>
              </div>
            </div>
            
            <div class="reporting-info">
              <h4>Reporting Violations</h4>
              <p>Users are encouraged to report violations using the "Report" button below each piece of content or via our <a href="#" data-nav="safety">Safety Center</a>. We prioritize reports from verified organizations through our Trusted Flagger Program.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-dmca">
            <h2>9. DMCA & Copyright</h2>
            
            <div class="dmca-info">
              <div class="dmca-process">
                <h4>Copyright Infringement Claims</h4>
                <p>To file a DMCA takedown notice, send the following to <strong>copyright@ominhub.com</strong>:</p>
                
                <ol>
                  <li>Identification of the copyrighted work</li>
                  <li>URL of the infringing material</li>
                  <li>Your contact information</li>
                  <li>Statement of good faith belief</li>
                  <li>Statement under penalty of perjury</li>
                  <li>Your physical or electronic signature</li>
                </ol>
              </div>
              
              <div class="counter-notice">
                <h4>Counter-Notice Procedure</h4>
                <p>If you believe your content was removed in error, you may submit a counter-notice. We will forward it to the original complainant, who may file a lawsuit within 10-14 business days.</p>
              </div>
            </div>
            
            <div class="repeat-infringer">
              <h4>Repeat Infringer Policy</h4>
              <p>Accounts that receive multiple valid copyright infringement notices may be terminated in accordance with our repeat infringer policy.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-privacy">
            <h2>10. Privacy & Data Security</h2>
            
            <div class="privacy-features">
              <div class="privacy-feature">
                <div class="feature-icon">🔐</div>
                <div class="feature-content">
                  <h4>End-to-End Encryption</h4>
                  <p>Private messages are encrypted and cannot be accessed by us.</p>
                </div>
              </div>
              
              <div class="privacy-feature">
                <div class="feature-icon">📁</div>
                <div class="feature-content">
                  <h4>Secure Storage</h4>
                  <p>All content is stored using AES-256 encryption.</p>
                </div>
              </div>
              
              <div class="privacy-feature">
                <div class="feature-icon">👁️</div>
                <div class="feature-content">
                  <h4>Minimal Data Collection</h4>
                  <p>We collect only what's necessary for platform operation.</p>
                </div>
              </div>
              
              <div class="privacy-feature">
                <div class="feature-icon">🗑️</div>
                <div class="feature-content">
                  <h4>Right to Deletion</h4>
                  <p>You may request deletion of your data at any time.</p>
                </div>
              </div>
            </div>
            
            <div class="data-retention">
              <h4>Data Retention Schedule</h4>
              <table class="retention-table">
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Retention Period</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Account Data</td>
                    <td>Until deletion request</td>
                    <td>Platform operation</td>
                  </tr>
                  <tr>
                    <td>Age Verification</td>
                    <td>7 days post-verification</td>
                    <td>Compliance only</td>
                  </tr>
                  <tr>
                    <td>Financial Records</td>
                    <td>7 years</td>
                    <td>Tax compliance</td>
                  </tr>
                  <tr>
                    <td>Content</td>
                    <td>Until account deletion</td>
                    <td>User content</td>
                  </tr>
                  <tr>
                    <td>Access Logs</td>
                    <td>90 days</td>
                    <td>Security monitoring</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="terms-section" id="section-liability">
            <h2>11. Liability & Disclaimer</h2>
            
            <div class="disclaimer-content">
              <div class="disclaimer-item">
                <h4>Platform "As Is"</h4>
                <p>The Platform is provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted access or error-free operation.</p>
              </div>
              
              <div class="disclaimer-item">
                <h4>Content Responsibility</h4>
                <p>We are not responsible for user-generated content. All content is the sole responsibility of the uploader.</p>
              </div>
              
              <div class="disclaimer-item">
                <h4>Third-Party Links</h4>
                <p>We are not responsible for third-party websites linked from our Platform.</p>
              </div>
              
              <div class="disclaimer-item">
                <h4>Limitation of Liability</h4>
                <p>To the maximum extent permitted by law, our liability is limited to the amount you paid for services in the last 12 months.</p>
              </div>
            </div>
            
            <div class="liability-note">
              <h4>Indemnification</h4>
              <p>You agree to indemnify and hold OMINHUB harmless from any claims arising from your use of the Platform, your content, or your violation of these Terms.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-termination">
            <h2>12. Termination</h2>
            
            <div class="termination-details">
              <div class="termination-reason">
                <h4>We May Terminate For:</h4>
                <ul>
                  <li>Violation of these Terms</li>
                  <li>Illegal activity</li>
                  <li>Fraudulent behavior</li>
                  <li>Platform abuse</li>
                  <li>Legal requirements</li>
                </ul>
              </div>
              
              <div class="termination-process">
                <h4>Termination Process:</h4>
                <ol>
                  <li>Warning (for minor violations)</li>
                  <li>Temporary suspension</li>
                  <li>Permanent termination</li>
                  <li>Withholding of earnings (serious violations)</li>
                  <li>Legal reporting (illegal activity)</li>
                </ol>
              </div>
            </div>
            
            <div class="termination-notice">
              <h4>You May Terminate:</h4>
              <p>You may terminate your account at any time by deleting it through your account settings. Upon termination, your content may be removed, though backup copies may exist in our archives for compliance purposes.</p>
            </div>
          </div>
          
          <div class="terms-section" id="section-jurisdiction">
            <h2>13. Jurisdiction & Governing Law</h2>
            
            <div class="jurisdiction-info">
              <div class="jurisdiction-item">
                <h4>Governing Law</h4>
                <p>These Terms are governed by the laws of <strong>Costa Rica</strong>, without regard to conflict of law principles.</p>
              </div>
              
              <div class="jurisdiction-item">
                <h4>Dispute Resolution</h4>
                <p>Any disputes shall be resolved through binding arbitration in <strong>San José, Costa Rica</strong>, unless prohibited by your local laws.</p>
              </div>
              
              <div class="jurisdiction-item">
                <h4>EU Users</h4>
                <p>EU users may have additional rights under GDPR and may contact our Data Protection Officer at <strong>dpo@ominhub.com</strong>.</p>
              </div>
              
              <div class="jurisdiction-item">
                <h4>Time Limit for Claims</h4>
                <p>Any claim must be brought within <strong>1 year</strong> of the event giving rise to the claim.</p>
              </div>
            </div>
          </div>
          
          <div class="terms-section" id="section-contact">
            <h2>14. Contact Information</h2>
            
            <div class="contact-grid">
              <div class="contact-card">
                <h4>General Support</h4>
                <p><strong>Email:</strong> support@ominhub.com</p>
                <p><strong>Response Time:</strong> 24-48 hours</p>
              </div>
              
              <div class="contact-card">
                <h4>Legal & DMCA</h4>
                <p><strong>Email:</strong> legal@ominhub.com</p>
                <p><strong>DMCA:</strong> copyright@ominhub.com</p>
              </div>
              
              <div class="contact-card">
                <h4>Privacy & Data</h4>
                <p><strong>Email:</strong> privacy@ominhub.com</p>
                <p><strong>DPO:</strong> dpo@ominhub.com</p>
              </div>
              
              <div class="contact-card">
                <h4>Emergency</h4>
                <p><strong>Email:</strong> emergency@ominhub.com</p>
                <p><strong>Response Time:</strong> 2-4 hours</p>
              </div>
              
              <div class="contact-card">
                <h4>Physical Address</h4>
                <p>OMINHUB Inc.</p>
                <p>San José, Costa Rica</p>
                <p>Registered in Costa Rica</p>
              </div>
              
              <div class="contact-card">
                <h4>Creator Support</h4>
                <p><strong>Email:</strong> creators@ominhub.com</p>
                <p><strong>Mon-Fri:</strong> 9am-6pm CST</p>
              </div>
            </div>
          </div>
          
          <div class="terms-footer">
            <div class="terms-acknowledgment">
              <h3>⚠️ Important Reminder</h3>
              <p>By using OMINHUB, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These Terms constitute the entire agreement between you and OMINHUB regarding your use of the Platform.</p>
              
              <div class="terms-signature">
                <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
            
            <div class="terms-version">
              <p>Version: 2.0 • These Terms supersede all previous versions</p>
              <p class="terms-timestamp">Generated: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    // Add smooth scrolling for table of contents links
    document.querySelectorAll('.terms-toc a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    Router.wireNavigation();
}

export const Terms = {
    renderTerms
}