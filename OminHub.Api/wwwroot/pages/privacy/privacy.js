import { Router } from "../../utils/router.js";
import { I18n } from "../../features/i18n.js";

function renderPrivacy(main) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1 data-translate="Comprehensive Privacy Policy">🏛️ Comprehensive Privacy Policy</h1>
        <p class="section-subtitle" data-translate="Effective Date: ${currentDate} • Last Updated: ${currentDate}">Effective Date: ${currentDate} • Last Updated: ${currentDate}</p>
        
        <!-- Privacy Overview -->
        <div class="privacy-overview-hero">
          <div class="privacy-hero-content">
            <div class="privacy-badge-large">🔐</div>
            <h2 data-translate="OMINHUB Privacy Commitment">OMINHUB Privacy Commitment</h2>
            <p data-translate="We are committed to protecting your privacy with industry-leading security measures, transparent data practices, and strict compliance with international privacy laws. This comprehensive policy details how we collect, use, protect, and manage your personal information.">We are committed to protecting your privacy with industry-leading security measures, transparent data practices, and strict compliance with international privacy laws. This comprehensive policy details how we collect, use, protect, and manage your personal information.</p>
            <div class="compliance-badges">
              <span class="compliance-badge" data-translate="GDPR Compliant">GDPR Compliant</span>
              <span class="compliance-badge" data-translate="CCPA Ready">CCPA Ready</span>
              <span class="compliance-badge" data-translate="ISO 27001">ISO 27001</span>
              <span class="compliance-badge" data-translate="SOC 2 Type II">SOC 2 Type II</span>
            </div>
          </div>
        </div>
        
        <!-- Quick Navigation -->
        <div class="privacy-quick-nav">
          <h3 data-translate="Quick Navigation">🔍 Quick Navigation</h3>
          <div class="quick-nav-grid">
            <a href="#data-collection" class="quick-nav-item">
              <div class="nav-icon">📥</div>
              <div class="nav-text" data-translate="Data We Collect">Data We Collect</div>
            </a>
            <a href="#data-usage" class="quick-nav-item">
              <div class="nav-icon">🔄</div>
              <div class="nav-text" data-translate="How We Use Data">How We Use Data</div>
            </a>
            <a href="#data-protection" class="quick-nav-item">
              <div class="nav-icon">🛡️</div>
              <div class="nav-text" data-translate="Data Protection">Data Protection</div>
            </a>
            <a href="#your-rights" class="quick-nav-item">
              <div class="nav-icon">⚖️</div>
              <div class="nav-text" data-translate="Your Rights">Your Rights</div>
            </a>
            <a href="#age-verification" class="quick-nav-item">
              <div class="nav-icon">🆔</div>
              <div class="nav-text" data-translate="Age Verification">Age Verification</div>
            </a>
            <a href="#contact" class="quick-nav-item">
              <div class="nav-icon">📞</div>
              <div class="nav-text" data-translate="Contact Us">Contact Us</div>
            </a>
          </div>
        </div>
        
        <!-- Table of Contents -->
        <div class="privacy-toc-detailed">
          <h3 data-translate="Table of Contents">📑 Table of Contents</h3>
          <div class="toc-columns">
            <div class="toc-column">
              <ol>
                <li><a href="#privacy1" data-translate="Information We Collect">Information We Collect</a></li>
                <li><a href="#privacy2" data-translate="How We Use Your Information">How We Use Your Information</a></li>
                <li><a href="#privacy3" data-translate="Legal Basis for Processing">Legal Basis for Processing</a></li>
                <li><a href="#privacy4" data-translate="Information Sharing & Disclosure">Information Sharing & Disclosure</a></li>
                <li><a href="#privacy5" data-translate="International Data Transfers">International Data Transfers</a></li>
                <li><a href="#privacy6" data-translate="Data Security Measures">Data Security Measures</a></li>
              </ol>
            </div>
            <div class="toc-column">
              <ol start="7">
                <li><a href="#privacy7" data-translate="Data Retention Policies">Data Retention Policies</a></li>
                <li><a href="#privacy8" data-translate="Your Rights & Choices">Your Rights & Choices</a></li>
                <li><a href="#privacy9" data-translate="Age Verification Process">Age Verification Process</a></li>
                <li><a href="#privacy10" data-translate="Children's Privacy">Children's Privacy</a></li>
                <li><a href="#privacy11" data-translate="Cookies & Tracking">Cookies & Tracking</a></li>
                <li><a href="#privacy12" data-translate="Contact Information">Contact Information</a></li>
              </ol>
            </div>
          </div>
        </div>
        
        <div class="privacy-content-detailed">
          <!-- Section 1: Information Collection -->
          <div class="privacy-section-expanded" id="privacy1">
            <div class="section-header">
              <div class="section-number">1</div>
              <h2 data-translate="Information We Collect">Information We Collect</h2>
            </div>
            <p class="section-intro" data-translate="We collect information necessary to provide our services, ensure platform safety, and comply with legal obligations. Data collection is minimized and proportional to the services provided.">We collect information necessary to provide our services, ensure platform safety, and comply with legal obligations. Data collection is minimized and proportional to the services provided.</p>
            
            <div class="data-categories-detailed">
              <div class="data-category-card">
                <div class="category-header">
                  <div class="category-icon">👤</div>
                  <h4 data-translate="Account & Profile Information">Account & Profile Information</h4>
                </div>
                <ul class="data-list">
                  <li><strong data-translate="Basic Information:">Basic Information:</strong> <span data-translate="Username, email address, password (encrypted)">Username, email address, password (encrypted)</span></li>
                  <li><strong data-translate="Profile Details:">Profile Details:</strong> <span data-translate="Display name, biography, profile pictures">Display name, biography, profile pictures</span></li>
                  <li><strong data-translate="Preferences:">Preferences:</strong> <span data-translate="Language settings, content filters, notification preferences">Language settings, content filters, notification preferences</span></li>
                  <li><strong data-translate="Verification Status:">Verification Status:</strong> <span data-translate="Age verification status, creator verification status">Age verification status, creator verification status</span></li>
                  <li><strong data-translate="Communication Preferences:">Communication Preferences:</strong> <span data-translate="Marketing opt-ins, notification settings">Marketing opt-ins, notification settings</span></li>
                </ul>
              </div>
              
              <div class="data-category-card">
                <div class="category-header">
                  <div class="category-icon">🎬</div>
                  <h4 data-translate="Content & Usage Data">Content & Usage Data</h4>
                </div>
                <ul class="data-list">
                  <li><strong data-translate="Uploaded Content:">Uploaded Content:</strong> <span data-translate="Videos, photos, thumbnails, metadata, descriptions">Videos, photos, thumbnails, metadata, descriptions</span></li>
                  <li><strong data-translate="Viewing Activity:">Viewing Activity:</strong> <span data-translate="Watch history, viewing duration, interactions">Watch history, viewing duration, interactions</span></li>
                  <li><strong data-translate="Search & Browsing:">Search & Browsing:</strong> <span data-translate="Search queries, browsing patterns, content preferences">Search queries, browsing patterns, content preferences</span></li>
                  <li><strong data-translate="Device Information:">Device Information:</strong> <span data-translate="IP address, browser type, device model, operating system">IP address, browser type, device model, operating system</span></li>
                  <li><strong data-translate="Performance Data:">Performance Data:</strong> <span data-translate="Engagement metrics, content performance analytics">Engagement metrics, content performance analytics</span></li>
                </ul>
              </div>
              
              <div class="data-category-card">
                <div class="category-header">
                  <div class="category-icon">💰</div>
                  <h4 data-translate="Financial & Transaction Data">Financial & Transaction Data</h4>
                </div>
                <ul class="data-list">
                  <li><strong data-translate="Payment Information:">Payment Information:</strong> <span data-translate="Processed securely through third-party providers (Stripe, PayPal)">Processed securely through third-party providers (Stripe, PayPal)</span></li>
                  <li><strong data-translate="Earnings Data:">Earnings Data:</strong> <span data-translate="Creator earnings, payout amounts, revenue splits">Creator earnings, payout amounts, revenue splits</span></li>
                  <li><strong data-translate="Transaction History:">Transaction History:</strong> <span data-translate="Purchase records, subscription payments, tips">Purchase records, subscription payments, tips</span></li>
                  <li><strong data-translate="Tax Information:">Tax Information:</strong> <span data-translate="Tax ID numbers (for creators above legal thresholds)">Tax ID numbers (for creators above legal thresholds)</span></li>
                  <li><strong data-translate="Verification Documents:">Verification Documents:</strong> <span data-translate="For payout verification and anti-fraud measures">For payout verification and anti-fraud measures</span></li>
                </ul>
              </div>
              
              <div class="data-category-card">
                <div class="category-header">
                  <div class="category-icon">📱</div>
                  <h4 data-translate="Technical & Log Data">Technical & Log Data</h4>
                </div>
                <ul class="data-list">
                  <li><strong data-translate="Server Logs:">Server Logs:</strong> <span data-translate="Access times, IP addresses, requested pages">Access times, IP addresses, requested pages</span></li>
                  <li><strong data-translate="Error Reports:">Error Reports:</strong> <span data-translate="Crash reports, performance issues, bug reports">Crash reports, performance issues, bug reports</span></li>
                  <li><strong data-translate="Analytics Data:">Analytics Data:</strong> <span data-translate="Aggregated, anonymized usage statistics">Aggregated, anonymized usage statistics</span></li>
                  <li><strong data-translate="Security Logs:">Security Logs:</strong> <span data-translate="Login attempts, suspicious activities, security events">Login attempts, suspicious activities, security events</span></li>
                </ul>
              </div>
            </div>
            
            <div class="special-notice-enhanced">
              <div class="notice-header">
                <div class="notice-icon">⚠️</div>
                <div class="notice-title" data-translate="Special Note on Sensitive Data Handling">Special Note on Sensitive Data Handling</div>
              </div>
              <div class="notice-content">
                <p><strong data-translate="Age Verification Documents:">Age Verification Documents:</strong> <span data-translate="We use third-party providers (Jumio, Veriff, Yoti) for age verification. These providers:">We use third-party providers (Jumio, Veriff, Yoti) for age verification. These providers:</span></p>
                <ul>
                  <li data-translate="Process government ID documents on our behalf">Process government ID documents on our behalf</li>
                  <li data-translate="Do not share the actual documents with OMINHUB">Do <strong>not</strong> share the actual documents with OMINHUB</li>
                  <li data-translate="Only provide verification status (approved/denied) and anonymized token">Only provide verification status (approved/denied) and anonymized token</li>
                  <li data-translate="Delete ID documents within 30 days (legal minimum) or immediately after verification in some jurisdictions">Delete ID documents within 30 days (legal minimum) or immediately after verification in some jurisdictions</li>
                  <li data-translate="Are independently audited for security compliance">Are independently audited for security compliance</li>
                </ul>
                <p><strong data-translate="Biometric Data:">Biometric Data:</strong> <span data-translate="Any biometric data (facial recognition for age verification) is:">Any biometric data (facial recognition for age verification) is:</span></p>
                <ul>
                  <li data-translate="Processed in real-time and immediately deleted">Processed in real-time and immediately deleted</li>
                  <li data-translate="Not stored in any database">Not stored in any database</li>
                  <li data-translate="Used solely for age verification purposes">Used solely for age verification purposes</li>
                  <li data-translate="Subject to additional consent requirements where applicable">Subject to additional consent requirements where applicable</li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Section 2: Data Usage -->
          <div class="privacy-section-expanded" id="privacy2">
            <div class="section-header">
              <div class="section-number">2</div>
              <h2 data-translate="How We Use Your Information">How We Use Your Information</h2>
            </div>
            
            <div class="usage-table-container">
              <table class="privacy-table-detailed">
                <thead>
                  <tr>
                    <th data-translate="Purpose of Processing">Purpose of Processing</th>
                    <th data-translate="Legal Basis">Legal Basis</th>
                    <th data-translate="Data Categories Used">Data Categories Used</th>
                    <th data-translate="Retention Period">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong data-translate="Providing Platform Services">Providing Platform Services</strong><br>
                      <span data-translate="Account creation, content hosting, user interactions">Account creation, content hosting, user interactions</span>
                    </td>
                    <td data-translate="Contractual Necessity">Contractual Necessity</td>
                    <td data-translate="Account data, content, usage data">Account data, content, usage data</td>
                    <td data-translate="Until account deletion + 30 days">Until account deletion + 30 days</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Age Verification Compliance">Age Verification Compliance</strong><br>
                      <span data-translate="Mandatory age verification for creators and age-restricted content access">Mandatory age verification for creators and age-restricted content access</span>
                    </td>
                    <td data-translate="Legal Obligation">Legal Obligation</td>
                    <td data-translate="Verification status, age confirmation">Verification status, age confirmation</td>
                    <td data-translate="5-7 years (legal requirement)">5-7 years (legal requirement)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Payment Processing">Payment Processing</strong><br>
                      <span data-translate="Processing transactions, payouts, and financial operations">Processing transactions, payouts, and financial operations</span>
                    </td>
                    <td data-translate="Contractual Necessity">Contractual Necessity</td>
                    <td data-translate="Financial data, transaction history">Financial data, transaction history</td>
                    <td data-translate="7 years (tax compliance)">7 years (tax compliance)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Content Moderation & Safety">Content Moderation & Safety</strong><br>
                      <span data-translate="Reviewing content for policy compliance and platform safety">Reviewing content for policy compliance and platform safety</span>
                    </td>
                    <td data-translate="Legitimate Interest & Legal Obligation">Legitimate Interest & Legal Obligation</td>
                    <td data-translate="Content, usage patterns, reports">Content, usage patterns, reports</td>
                    <td data-translate="Until content deletion + 90 days">Until content deletion + 90 days</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Platform Improvement">Platform Improvement</strong><br>
                      <span data-translate="Analytics, feature development, user experience enhancement">Analytics, feature development, user experience enhancement</span>
                    </td>
                    <td data-translate="Legitimate Interest">Legitimate Interest</td>
                    <td data-translate="Anonymized usage data, analytics">Anonymized usage data, analytics</td>
                    <td data-translate="2 years (anonymized)">2 years (anonymized)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Security & Fraud Prevention">Security & Fraud Prevention</strong><br>
                      <span data-translate="Protecting users, preventing abuse, detecting fraudulent activity">Protecting users, preventing abuse, detecting fraudulent activity</span>
                    </td>
                    <td data-translate="Legitimate Interest">Legitimate Interest</td>
                    <td data-translate="IP addresses, device info, security logs">IP addresses, device info, security logs</td>
                    <td data-translate="90 days - 2 years">90 days - 2 years</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Legal & Regulatory Compliance">Legal & Regulatory Compliance</strong><br>
                      <span data-translate="Responding to legal requests, maintaining required records">Responding to legal requests, maintaining required records</span>
                    </td>
                    <td data-translate="Legal Obligation">Legal Obligation</td>
                    <td data-translate="Required records, transaction data">Required records, transaction data</td>
                    <td data-translate="As required by law (up to 7+ years)">As required by law (up to 7+ years)</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Marketing & Communications">Marketing & Communications</strong><br>
                      <span data-translate="Platform updates, promotional content (with consent)">Platform updates, promotional content (with consent)</span>
                    </td>
                    <td data-translate="Consent">Consent</td>
                    <td data-translate="Contact information, preferences">Contact information, preferences</td>
                    <td data-translate="Until consent withdrawal">Until consent withdrawal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="processing-notice">
              <h4 data-translate="Data Minimization Principle">🔍 Data Minimization Principle</h4>
              <p data-translate="We adhere to the data minimization principle, meaning we only collect and process data that is:">We adhere to the data minimization principle, meaning we only collect and process data that is:</p>
              <ul>
                <li><strong data-translate="Adequate:">Adequate:</strong> <span data-translate="Sufficient for the intended purpose">Sufficient for the intended purpose</span></li>
                <li><strong data-translate="Relevant:">Relevant:</strong> <span data-translate="Directly related to the processing purpose">Directly related to the processing purpose</span></li>
                <li><strong data-translate="Limited:">Limited:</strong> <span data-translate="Not excessive in relation to the purposes">Not excessive in relation to the purposes</span></li>
                <li><strong data-translate="Necessary:">Necessary:</strong> <span data-translate="Required for legitimate business purposes">Required for legitimate business purposes</span></li>
              </ul>
            </div>
          </div>
          
          <!-- Section 3: Legal Basis -->
          <div class="privacy-section-expanded" id="privacy3">
            <div class="section-header">
              <div class="section-number">3</div>
              <h2 data-translate="Legal Basis for Processing">Legal Basis for Processing</h2>
            </div>
            
            <div class="legal-basis-grid">
              <div class="basis-card">
                <div class="basis-icon">✍️</div>
                <div class="basis-content">
                  <h4 data-translate="Contractual Necessity">Contractual Necessity</h4>
                  <p data-translate="Processing necessary to perform our contract with you:">Processing necessary to perform our contract with you:</p>
                  <ul>
                    <li data-translate="Providing platform access and services">Providing platform access and services</li>
                    <li data-translate="Processing payments and payouts">Processing payments and payouts</li>
                    <li data-translate="Hosting and delivering your content">Hosting and delivering your content</li>
                    <li data-translate="Maintaining your account and preferences">Maintaining your account and preferences</li>
                  </ul>
                </div>
              </div>
              
              <div class="basis-card">
                <div class="basis-icon">⚖️</div>
                <div class="basis-content">
                  <h4 data-translate="Legal Obligation">Legal Obligation</h4>
                  <p data-translate="Processing required to comply with legal requirements:">Processing required to comply with legal requirements:</p>
                  <ul>
                    <li data-translate="Age verification for adult content">Age verification for adult content</li>
                    <li data-translate="Record-keeping under 18 U.S.C. § 2257">Record-keeping under 18 U.S.C. § 2257</li>
                    <li data-translate="Tax reporting and financial compliance">Tax reporting and financial compliance</li>
                    <li data-translate="Responding to legal requests and subpoenas">Responding to legal requests and subpoenas</li>
                    <li data-translate="Content moderation for illegal material">Content moderation for illegal material</li>
                  </ul>
                </div>
              </div>
              
              <div class="basis-card">
                <div class="basis-icon">🎯</div>
                <div class="basis-content">
                  <h4 data-translate="Legitimate Interest">Legitimate Interest</h4>
                  <p data-translate="Processing necessary for our legitimate interests, balanced against your rights:">Processing necessary for our legitimate interests, balanced against your rights:</p>
                  <ul>
                    <li data-translate="Platform security and fraud prevention">Platform security and fraud prevention</li>
                    <li data-translate="Service improvement and analytics">Service improvement and analytics</li>
                    <li data-translate="Network and information security">Network and information security</li>
                    <li data-translate="Business administration and operations">Business administration and operations</li>
                    <li data-translate="Enforcement of terms and policies">Enforcement of terms and policies</li>
                  </ul>
                </div>
              </div>
              
              <div class="basis-card">
                <div class="basis-icon">✅</div>
                <div class="basis-content">
                  <h4 data-translate="Consent">Consent</h4>
                  <p data-translate="Processing based on your explicit consent:">Processing based on your explicit consent:</p>
                  <ul>
                    <li data-translate="Marketing communications">Marketing communications</li>
                    <li data-translate="Non-essential cookies and tracking">Non-essential cookies and tracking</li>
                    <li data-translate="Participation in optional features">Participation in optional features</li>
                    <li data-translate="Special category data processing (where applicable)">Special category data processing (where applicable)</li>
                  </ul>
                  <p class="consent-note"><strong data-translate="Withdrawal:">Withdrawal:</strong> <span data-translate="You can withdraw consent at any time through account settings.">You can withdraw consent at any time through account settings.</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 4: Data Sharing -->
          <div class="privacy-section-expanded" id="privacy4">
            <div class="section-header">
              <div class="section-number">4</div>
              <h2 data-translate="Information Sharing & Disclosure">Information Sharing & Disclosure</h2>
            </div>
            
            <div class="sharing-categories">
              <div class="sharing-category">
                <h4 data-translate="Service Providers & Processors">🔒 Service Providers & Processors</h4>
                <p data-translate="We engage trusted third-party service providers who process data on our behalf under strict data processing agreements:">We engage trusted third-party service providers who process data on our behalf under strict data processing agreements:</p>
                <div class="provider-grid">
                  <div class="provider-card">
                    <h5 data-translate="Payment Processors">Payment Processors</h5>
                    <ul>
                      <li><strong data-translate="Stripe:">Stripe:</strong> <span data-translate="Payment processing and fraud detection">Payment processing and fraud detection</span></li>
                      <li><strong data-translate="PayPal:">PayPal:</strong> <span data-translate="Alternative payment method processing">Alternative payment method processing</span></li>
                      <li><strong data-translate="Banking Partners:">Banking Partners:</strong> <span data-translate="Payout processing and wire transfers">Payout processing and wire transfers</span></li>
                    </ul>
                    <div class="data-scope" data-translate="Scope: Transaction data only">Scope: Transaction data only</div>
                  </div>
                  
                  <div class="provider-card">
                    <h5 data-translate="Age Verification Providers">Age Verification Providers</h5>
                    <ul>
                      <li><strong data-translate="Jumio/Veriff/Yoti:">Jumio/Veriff/Yoti:</strong> <span data-translate="Identity and age verification">Identity and age verification</span></li>
                      <li><strong data-translate="Document Processing:">Document Processing:</strong> <span data-translate="ID verification and validation">ID verification and validation</span></li>
                    </ul>
                    <div class="data-scope" data-translate="Scope: Verification documents (not shared with us)">Scope: Verification documents (not shared with us)</div>
                  </div>
                  
                  <div class="provider-card">
                    <h5 data-translate="Infrastructure Providers">Infrastructure Providers</h5>
                    <ul>
                      <li><strong data-translate="AWS/Cloud Providers:">AWS/Cloud Providers:</strong> <span data-translate="Hosting and content delivery">Hosting and content delivery</span></li>
                      <li><strong data-translate="Cloudflare:">Cloudflare:</strong> <span data-translate="CDN and DDoS protection">CDN and DDoS protection</span></li>
                      <li><strong data-translate="Database Services:">Database Services:</strong> <span data-translate="Data storage and management">Data storage and management</span></li>
                    </ul>
                    <div class="data-scope" data-translate="Scope: Encrypted content and platform data">Scope: Encrypted content and platform data</div>
                  </div>
                  
                  <div class="provider-card">
                    <h5 data-translate="Analytics & Support">Analytics & Support</h5>
                    <ul>
                      <li><strong data-translate="Google Analytics:">Google Analytics:</strong> <span data-translate="Platform analytics (anonymized)">Platform analytics (anonymized)</span></li>
                      <li><strong data-translate="Support Software:">Support Software:</strong> <span data-translate="Customer service platforms">Customer service platforms</span></li>
                      <li><strong data-translate="Monitoring Tools:">Monitoring Tools:</strong> <span data-translate="Performance and error tracking">Performance and error tracking</span></li>
                    </ul>
                    <div class="data-scope" data-translate="Scope: Anonymized or limited necessary data">Scope: Anonymized or limited necessary data</div>
                  </div>
                </div>
              </div>
              
              <div class="sharing-category">
                <h4 data-translate="Legal & Regulatory Disclosures">⚖️ Legal & Regulatory Disclosures</h4>
                <p data-translate="We may disclose information when legally required or necessary to protect rights:">We may disclose information when legally required or necessary to protect rights:</p>
                <div class="disclosure-grid">
                  <div class="disclosure-card">
                    <h5 data-translate="Law Enforcement Requests">Law Enforcement Requests</h5>
                    <p data-translate="We respond to valid legal requests from law enforcement agencies, courts, or government authorities. All requests are reviewed by our legal team for validity and compliance with applicable laws.">We respond to valid legal requests from law enforcement agencies, courts, or government authorities. All requests are reviewed by our legal team for validity and compliance with applicable laws.</p>
                    <div class="disclosure-process">
                      <strong data-translate="Our Process:">Our Process:</strong>
                      <ul>
                        <li data-translate="Legal team review of all requests">Legal team review of all requests</li>
                        <li data-translate="Validation of jurisdiction and authority">Validation of jurisdiction and authority</li>
                        <li data-translate="Assessment of legal requirements">Assessment of legal requirements</li>
                        <li data-translate="Minimal necessary data disclosure">Minimal necessary data disclosure</li>
                        <li data-translate="Transparency reporting (where permitted)">Transparency reporting (where permitted)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="disclosure-card">
                    <h5 data-translate="Regulatory Compliance">Regulatory Compliance</h5>
                    <p data-translate="Required disclosures to regulatory bodies for compliance purposes:">Required disclosures to regulatory bodies for compliance purposes:</p>
                    <ul>
                      <li data-translate="Financial regulatory authorities">Financial regulatory authorities</li>
                      <li data-translate="Data protection authorities">Data protection authorities</li>
                      <li data-translate="Content regulation bodies">Content regulation bodies</li>
                      <li data-translate="Tax authorities">Tax authorities</li>
                    </ul>
                  </div>
                  
                  <div class="disclosure-card">
                    <h5 data-translate="Protection of Rights & Safety">Protection of Rights & Safety</h5>
                    <p data-translate="Disclosure necessary to protect the rights, property, or safety of OMINHUB, our users, or the public:">Disclosure necessary to protect the rights, property, or safety of OMINHUB, our users, or the public:</p>
                    <ul>
                      <li data-translate="Prevention of fraud or security issues">Prevention of fraud or security issues</li>
                      <li data-translate="Enforcement of terms and policies">Enforcement of terms and policies</li>
                      <li data-translate="Protection against legal liability">Protection against legal liability</li>
                      <li data-translate="Emergency situations involving danger">Emergency situations involving danger</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="no-sale-policy">
                <div class="no-sale-header">
                  <div class="no-sale-icon">🚫</div>
                  <div class="no-sale-content">
                    <h4 data-translate="WE DO NOT SELL PERSONAL DATA">WE DO NOT SELL PERSONAL DATA</h4>
                    <p data-translate="OMINHUB does not sell, rent, trade, or otherwise commercially exploit your personal information. We do not participate in data brokerage or advertising data sales. Any data sharing is strictly for service provision or legal compliance purposes.">OMINHUB does not sell, rent, trade, or otherwise commercially exploit your personal information. We do not participate in data brokerage or advertising data sales. Any data sharing is strictly for service provision or legal compliance purposes.</p>
                    <div class="sale-exceptions">
                      <strong data-translate="Limited Exceptions:">Limited Exceptions:</strong>
                      <ul>
                        <li data-translate="Business transfers (merger, acquisition, bankruptcy)">Business transfers (merger, acquisition, bankruptcy)</li>
                        <li data-translate="Aggregated, anonymized statistical data">Aggregated, anonymized statistical data</li>
                        <li data-translate="Legal requirements overriding this policy">Legal requirements overriding this policy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 5: International Transfers -->
          <div class="privacy-section-expanded" id="privacy5">
            <div class="section-header">
              <div class="section-number">5</div>
              <h2 data-translate="International Data Transfers">International Data Transfers</h2>
            </div>
            
            <div class="transfer-info">
              <div class="transfer-overview">
                <h4 data-translate="Cross-Border Data Flow Management">🌍 Cross-Border Data Flow Management</h4>
                <p data-translate="As a global platform, data may be transferred to and processed in countries outside your country of residence. We implement robust safeguards for all international data transfers:">As a global platform, data may be transferred to and processed in countries outside your country of residence. We implement robust safeguards for all international data transfers:</p>
              </div>
              
              <div class="safeguards-grid">
                <div class="safeguard-card">
                  <h5 data-translate="Standard Contractual Clauses (SCCs)">Standard Contractual Clauses (SCCs)</h5>
                  <p data-translate="For transfers from the European Economic Area (EEA), United Kingdom, and Switzerland, we use EU-approved Standard Contractual Clauses with our service providers.">For transfers from the European Economic Area (EEA), United Kingdom, and Switzerland, we use EU-approved Standard Contractual Clauses with our service providers.</p>
                  <div class="safeguard-status" data-translate="Status: Implemented for all EU data transfers">Status: Implemented for all EU data transfers</div>
                </div>
                
                <div class="safeguard-card">
                  <h5 data-translate="Adequacy Decisions">Adequacy Decisions</h5>
                  <p data-translate="Where available, we rely on adequacy decisions recognizing that certain countries provide adequate data protection.">Where available, we rely on adequacy decisions recognizing that certain countries provide adequate data protection.</p>
                  <div class="safeguard-status" data-translate="Applicable Countries: UK, Switzerland, Japan, etc.">Applicable Countries: UK, Switzerland, Japan, etc.</div>
                </div>
                
                <div class="safeguard-card">
                  <h5 data-translate="Additional Safeguards">Additional Safeguards</h5>
                  <p data-translate="Supplemental measures for enhanced protection:">Supplemental measures for enhanced protection:</p>
                  <ul>
                    <li data-translate="End-to-end encryption for sensitive transfers">End-to-end encryption for sensitive transfers</li>
                    <li data-translate="Data minimization for cross-border transfers">Data minimization for cross-border transfers</li>
                    <li data-translate="Regular security assessments of processors">Regular security assessments of processors</li>
                    <li data-translate="Contractual obligations for data protection">Contractual obligations for data protection</li>
                  </ul>
                </div>
                
                <div class="safeguard-card">
                  <h5 data-translate="Data Localization">Data Localization</h5>
                  <p data-translate="Where required by law, we implement data localization measures:">Where required by law, we implement data localization measures:</p>
                  <ul>
                    <li data-translate="EU user data primarily processed within the EU">EU user data primarily processed within the EU</li>
                    <li data-translate="Country-specific storage requirements">Country-specific storage requirements</li>
                    <li data-translate="Regional data centers where feasible">Regional data centers where feasible</li>
                  </ul>
                </div>
              </div>
              
              <div class="transfer-notice">
                <h5 data-translate="Your Rights Regarding International Transfers">Your Rights Regarding International Transfers</h5>
                <p data-translate="You have the right to obtain information about the safeguards we have in place for international data transfers. Contact our Data Protection Officer for details about specific transfers affecting your data.">You have the right to obtain information about the safeguards we have in place for international data transfers. Contact our Data Protection Officer for details about specific transfers affecting your data.</p>
              </div>
            </div>
          </div>
          
          <!-- Section 6: Data Security -->
          <div class="privacy-section-expanded" id="privacy6">
            <div class="section-header">
              <div class="section-number">6</div>
              <h2 data-translate="Data Security Measures">Data Security Measures</h2>
            </div>
            
            <div class="security-layers">
              <h4 data-translate="Multi-Layered Security Architecture">🔐 Multi-Layered Security Architecture</h4>
              
              <div class="security-layer">
                <h5 data-translate="Encryption & Data Protection">Encryption & Data Protection</h5>
                <div class="layer-measures">
                  <div class="measure">
                    <div class="measure-icon">🔒</div>
                    <div class="measure-content">
                      <h6 data-translate="AES-256 Encryption">AES-256 Encryption</h6>
                      <p data-translate="All sensitive data at rest encrypted using AES-256 military-grade encryption">All sensitive data at rest encrypted using AES-256 military-grade encryption</p>
                    </div>
                  </div>
                  <div class="measure">
                    <div class="measure-icon">📡</div>
                    <div class="measure-content">
                      <h6 data-translate="TLS 1.3 Encryption">TLS 1.3 Encryption</h6>
                      <p data-translate="All data in transit protected with TLS 1.3 encryption">All data in transit protected with TLS 1.3 encryption</p>
                    </div>
                  </div>
                  <div class="measure">
                    <div class="measure-icon">🗝️</div>
                    <div class="measure-content">
                      <h6 data-translate="Key Management">Key Management</h6>
                      <p data-translate="Enterprise-grade key management with regular rotation and access controls">Enterprise-grade key management with regular rotation and access controls</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="security-layer">
                <h5 data-translate="Access Controls & Authentication">Access Controls & Authentication</h5>
                <div class="layer-measures">
                  <div class="measure">
                    <div class="measure-icon">🛡️</div>
                    <div class="measure-content">
                      <h6 data-translate="Role-Based Access Control (RBAC)">Role-Based Access Control (RBAC)</h6>
                      <p data-translate="Strict access controls based on job function and necessity">Strict access controls based on job function and necessity</p>
                    </div>
                  </div>
                  <div class="measure">
                    <div class="measure-icon">🔐</div>
                    <div class="measure-content">
                      <h6 data-translate="Multi-Factor Authentication (MFA)">Multi-Factor Authentication (MFA)</h6>
                      <p data-translate="Required for all administrative access and available for user accounts">Required for all administrative access and available for user accounts</p>
                    </div>
                  </div>
                  <div class="measure">
                    <div class="measure-icon">👁️</div>
                    <div class="measure-content">
                      <h6 data-translate="Access Monitoring">Access Monitoring</h6>
                      <p data-translate="Comprehensive logging and monitoring of all data access">Comprehensive logging and monitoring of all data access</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="security-layer">
                <h5 data-translate="Infrastructure Security">Infrastructure Security</h5>
                <div class="layer-measures">
                  <div class="measure">
                    <div class="measure-icon">🛡️</div>
                    <div class="measure-content">
                      <h6 data-translate="Network Security">Network Security</h6>
                      <p data-translate="Firewalls, DDoS protection, and intrusion detection systems">Firewalls, DDoS protection, and intrusion detection systems</p>
                    </div>
                  </div>
                  <div class="measure">
                    <div class="measure-icon">🔍</div>
                    <div class="measure-content">
                      <h6 data-translate="Vulnerability Management">Vulnerability Management</h6>
                      <p data-translate="Regular security scans, penetration testing, and vulnerability assessments">Regular security scans, penetration testing, and vulnerability assessments</p>
                    </div>
                  </div>
                  <div class="measure">
                    <div class="measure-icon">📋</div>
                    <div class="measure-content">
                      <h6 data-translate="Compliance Certifications">Compliance Certifications</h6>
                      <p data-translate="ISO 27001, SOC 2 Type II, PCI DSS compliance where applicable">ISO 27001, SOC 2 Type II, PCI DSS compliance where applicable</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="security-incident">
                <h5 data-translate="Security Incident Response">Security Incident Response</h5>
                <p data-translate="In the event of a data breach or security incident, we have a comprehensive response plan:">In the event of a data breach or security incident, we have a comprehensive response plan:</p>
                <div class="incident-steps">
                  <div class="incident-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h6 data-translate="Immediate Containment">Immediate Containment</h6>
                      <p data-translate="Isolate affected systems and prevent further unauthorized access">Isolate affected systems and prevent further unauthorized access</p>
                    </div>
                  </div>
                  <div class="incident-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h6 data-translate="Investigation & Assessment">Investigation & Assessment</h6>
                      <p data-translate="Determine scope, impact, and root cause of the incident">Determine scope, impact, and root cause of the incident</p>
                    </div>
                  </div>
                  <div class="incident-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h6 data-translate="Notification">Notification</h6>
                      <p data-translate="Notify affected users and authorities as required by law">Notify affected users and authorities as required by law</p>
                    </div>
                  </div>
                  <div class="incident-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h6 data-translate="Remediation & Prevention">Remediation & Prevention</h6>
                      <p data-translate="Implement corrective measures and prevent future incidents">Implement corrective measures and prevent future incidents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 7: Data Retention -->
          <div class="privacy-section-expanded" id="privacy7">
            <div class="section-header">
              <div class="section-number">7</div>
              <h2 data-translate="Data Retention Policies">Data Retention Policies</h2>
            </div>
            
            <div class="retention-overview">
              <h4 data-translate="Comprehensive Retention Schedule">📅 Comprehensive Retention Schedule</h4>
              <p data-translate="We retain personal data only for as long as necessary for the purposes described in this policy, unless a longer retention period is required or permitted by law.">We retain personal data only for as long as necessary for the purposes described in this policy, unless a longer retention period is required or permitted by law.</p>
            </div>
            
            <div class="retention-table-container">
              <table class="retention-table-detailed">
                <thead>
                  <tr>
                    <th data-translate="Data Category">Data Category</th>
                    <th data-translate="Retention Period">Retention Period</th>
                    <th data-translate="Legal Basis">Legal Basis</th>
                    <th data-translate="Deletion Process">Deletion Process</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong data-translate="Account Data">Account Data</strong><br>
                      <span data-translate="Username, email, profile information">Username, email, profile information</span>
                    </td>
                    <td data-translate="Until account deletion + 30 days">Until account deletion + 30 days</td>
                    <td data-translate="Contractual necessity">Contractual necessity</td>
                    <td data-translate="Automated deletion after account closure grace period">Automated deletion after account closure grace period</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="User Content">User Content</strong><br>
                      <span data-translate="Videos, photos, comments, messages">Videos, photos, comments, messages</span>
                    </td>
                    <td data-translate="Until deletion request or account closure">Until deletion request or account closure</td>
                    <td data-translate="Contractual necessity">Contractual necessity</td>
                    <td data-translate="Immediate removal from active systems upon request">Immediate removal from active systems upon request</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Financial Records">Financial Records</strong><br>
                      <span data-translate="Transaction data, earnings, payout records">Transaction data, earnings, payout records</span>
                    </td>
                    <td data-translate="7-10 years">7-10 years</td>
                    <td data-translate="Legal obligation (tax compliance)">Legal obligation (tax compliance)</td>
                    <td data-translate="Secure archival with limited access">Secure archival with limited access</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Age Verification Records">Age Verification Records</strong><br>
                      <span data-translate="Verification status, audit logs">Verification status, audit logs</span>
                    </td>
                    <td data-translate="5-7 years">5-7 years</td>
                    <td data-translate="Legal obligation (18 U.S.C. § 2257)">Legal obligation (18 U.S.C. § 2257)</td>
                    <td data-translate="Secure storage with encryption and access controls">Secure storage with encryption and access controls</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Access & Security Logs">Access & Security Logs</strong><br>
                      <span data-translate="Login attempts, security events, IP logs">Login attempts, security events, IP logs</span>
                    </td>
                    <td data-translate="90 days - 2 years">90 days - 2 years</td>
                    <td data-translate="Legitimate interest (security)">Legitimate interest (security)</td>
                    <td data-translate="Regular automated purging based on retention schedule">Regular automated purging based on retention schedule</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Analytics Data">Analytics Data</strong><br>
                      <span data-translate="Usage statistics, platform metrics">Usage statistics, platform metrics</span>
                    </td>
                    <td data-translate="2 years (anonymized)">2 years (anonymized)</td>
                    <td data-translate="Legitimate interest">Legitimate interest</td>
                    <td data-translate="Anonymization after 6 months, deletion after 2 years">Anonymization after 6 months, deletion after 2 years</td>
                  </tr>
                  <tr>
                    <td>
                      <strong data-translate="Backup Copies">Backup Copies</strong><br>
                      <span data-translate="System backups containing user data">System backups containing user data</span>
                    </td>
                    <td data-translate="30-90 days">30-90 days</td>
                    <td data-translate="Legitimate interest (disaster recovery)">Legitimate interest (disaster recovery)</td>
                    <td data-translate="Secure overwrite during backup rotation">Secure overwrite during backup rotation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="data-deletion-info">
              <h5 data-translate="Data Deletion Process">🗑️ Data Deletion Process</h5>
              <div class="deletion-steps">
                <div class="deletion-step">
                  <div class="step-icon">1</div>
                  <div class="step-content">
                    <h6 data-translate="Immediate Deactivation">Immediate Deactivation</h6>
                    <p data-translate="Upon deletion request, data is immediately removed from active systems and user access is revoked.">Upon deletion request, data is immediately removed from active systems and user access is revoked.</p>
                  </div>
                </div>
                <div class="deletion-step">
                  <div class="step-icon">2</div>
                  <div class="step-content">
                    <h6 data-translate="Secure Erasure">Secure Erasure</h6>
                    <p data-translate="Data is securely erased from production systems using certified data destruction methods.">Data is securely erased from production systems using certified data destruction methods.</p>
                  </div>
                </div>
                <div class="deletion-step">
                  <div class="step-icon">3</div>
                  <div class="step-content">
                    <h6 data-translate="Backup Purge">Backup Purge</h6>
                    <p data-translate="Data is removed from backup systems during the next backup rotation cycle (within 90 days).">Data is removed from backup systems during the next backup rotation cycle (within 90 days).</p>
                  </div>
                </div>
                <div class="deletion-step">
                  <div class="step-icon">4</div>
                  <div class="step-content">
                    <h6 data-translate="Confirmation">Confirmation</h6>
                    <p data-translate="Users receive confirmation of data deletion completion.">Users receive confirmation of data deletion completion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 8: User Rights -->
          <div class="privacy-section-expanded" id="privacy8">
            <div class="section-header">
              <div class="section-number">8</div>
              <h2 data-translate="Your Rights & Choices">Your Rights & Choices</h2>
            </div>
            
            <div class="rights-overview">
              <h4 data-translate="Comprehensive Privacy Rights">⚖️ Comprehensive Privacy Rights</h4>
              <p data-translate="Depending on your location and applicable laws, you may have the following rights regarding your personal data:">Depending on your location and applicable laws, you may have the following rights regarding your personal data:</p>
            </div>
            
            <div class="rights-grid-detailed">
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">📋</div>
                  <h5 data-translate="Right to Access">Right to Access</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Request a copy of your personal data and information about how it's processed.">Request a copy of your personal data and information about how it's processed.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="alert('To exercise this right, email privacy@ominhub.com with your request. We will respond within 30 days.')" data-translate="Request Access">Request Access</button>
                    <div class="response-time" data-translate="Response: 30 days maximum">Response: 30 days maximum</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">✏️</div>
                  <h5 data-translate="Right to Rectification">Right to Rectification</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Correct inaccurate or incomplete personal data.">Correct inaccurate or incomplete personal data.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="window.location.href = Router.resolveHref('profile')" data-translate="Update Information">Update Information</button>
                    <div class="response-time" data-translate="Most updates: Immediate">Most updates: Immediate</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">🗑️</div>
                  <h5 data-translate="Right to Erasure">Right to Erasure</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Request deletion of your personal data under certain circumstances.">Request deletion of your personal data under certain circumstances.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="alert('Go to Settings → Account → Delete Account. Legal records may be retained as required by law.')" data-translate="Delete Account">Delete Account</button>
                    <div class="response-time" data-translate="Processing: 30 days">Processing: 30 days</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">⏸️</div>
                  <h5 data-translate="Right to Restrict Processing">Right to Restrict Processing</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Temporarily limit the processing of your data under specific conditions.">Temporarily limit the processing of your data under specific conditions.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="alert('Contact privacy@ominhub.com to request processing restriction.')" data-translate="Request Restriction">Request Restriction</button>
                    <div class="response-time" data-translate="Response: 30 days">Response: 30 days</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">📤</div>
                  <h5 data-translate="Right to Data Portability">Right to Data Portability</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Receive your data in a structured, commonly used, machine-readable format.">Receive your data in a structured, commonly used, machine-readable format.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="alert('Email privacy@ominhub.com for data export. Available formats: JSON, CSV.')" data-translate="Export Data">Export Data</button>
                    <div class="response-time" data-translate="Processing: 30 days">Processing: 30 days</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">🙅</div>
                  <h5 data-translate="Right to Object">Right to Object</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Object to processing based on legitimate interests or for direct marketing.">Object to processing based on legitimate interests or for direct marketing.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="window.location.href = Router.resolveHref('profile')" data-translate="Manage Preferences">Manage Preferences</button>
                    <div class="response-time" data-translate="Marketing opt-out: Immediate">Marketing opt-out: Immediate</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">🤖</div>
                  <h5 data-translate="Right to Automated Decision-Making">Right to Automated Decision-Making</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Not to be subject to decisions based solely on automated processing with legal effects.">Not to be subject to decisions based solely on automated processing with legal effects.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="alert('Contact privacy@ominhub.com to request human review of automated decisions.')" data-translate="Request Review">Request Review</button>
                    <div class="response-time" data-translate="Review: 30 days">Review: 30 days</div>
                  </div>
                </div>
              </div>
              
              <div class="right-card-enhanced">
                <div class="right-header">
                  <div class="right-icon">🔔</div>
                  <h5 data-translate="Right to Notification">Right to Notification</h5>
                </div>
                <div class="right-content">
                  <p data-translate="Be notified of data breaches affecting your personal data.">Be notified of data breaches affecting your personal data.</p>
                  <div class="right-action-section">
                    <button class="right-action-btn" onclick="alert('Breach notifications are automatic. Ensure your contact information is current.')" data-translate="Update Contacts">Update Contacts</button>
                    <div class="response-time" data-translate="Breach notice: As required by law">Breach notice: As required by law</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="rights-exercising">
              <h5 data-translate="How to Exercise Your Rights">How to Exercise Your Rights</h5>
              <div class="exercise-methods">
                <div class="method-card">
                  <h6 data-translate="Email Request">📧 Email Request</h6>
                  <p data-translate="Send detailed request to privacy@ominhub.com including:">Send detailed request to <strong>privacy@ominhub.com</strong> including:</p>
                  <ul>
                    <li data-translate="Your username or account email">Your username or account email</li>
                    <li data-translate="Specific right being exercised">Specific right being exercised</li>
                    <li data-translate="Any relevant details">Any relevant details</li>
                  </ul>
                </div>
                
                <div class="method-card">
                  <h6 data-translate="Account Settings">⚙️ Account Settings</h6>
                  <p data-translate="Many rights can be exercised through your account settings:">Many rights can be exercised through your account settings:</p>
                  <ul>
                    <li data-translate="Profile information updates">Profile information updates</li>
                    <li data-translate="Communication preferences">Communication preferences</li>
                    <li data-translate="Data download requests">Data download requests</li>
                    <li data-translate="Account deletion">Account deletion</li>
                  </ul>
                </div>
                
                <div class="method-card">
                  <h6 data-translate="Phone Support">📞 Phone Support</h6>
                  <p data-translate="For urgent matters or assistance:">For urgent matters or assistance:</p>
                  <ul>
                    <li data-translate="Privacy hotline: Available upon request">Privacy hotline: Available upon request</li>
                    <li data-translate="Verification required for security">Verification required for security</li>
                    <li data-translate="Follow-up documentation may be required">Follow-up documentation may be required</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="verification-process">
              <h5 data-translate="Identity Verification for Rights Requests">Identity Verification for Rights Requests</h5>
              <p data-translate="To protect your privacy and security, we verify identity before processing rights requests. Verification may require:">To protect your privacy and security, we verify identity before processing rights requests. Verification may require:</p>
              <ul>
                <li data-translate="Account login confirmation">Account login confirmation</li>
                <li data-translate="Email verification from registered address">Email verification from registered address</li>
                <li data-translate="Additional security questions for sensitive requests">Additional security questions for sensitive requests</li>
                <li data-translate="Government ID for high-risk requests (rarely required)">Government ID for high-risk requests (rarely required)</li>
              </ul>
            </div>
          </div>
          
          <!-- Section 9: Age Verification -->
          <div class="privacy-section-expanded" id="privacy9">
            <div class="section-header">
              <div class="section-number">9</div>
              <h2 data-translate="Age Verification Process">Age Verification Process</h2>
            </div>
            
            <div class="age-verification-details">
              <h4 data-translate="Comprehensive Age Verification System">🆔 Comprehensive Age Verification System</h4>
              <p data-translate="Given the adult nature of our platform, we implement rigorous age verification systems to ensure all users and creators are 18 years of age or older.">Given the adult nature of our platform, we implement rigorous age verification systems to ensure all users and creators are 18 years of age or older.</p>
              
              <div class="verification-tiers">
                <div class="tier">
                  <div class="tier-header">
                    <div class="tier-badge" data-translate="Tier 1">Tier 1</div>
                    <h5 data-translate="Self-Declaration (Viewers)">Self-Declaration (Viewers)</h5>
                  </div>
                  <div class="tier-content">
                    <p data-translate="For viewers accessing age-restricted content:">For viewers accessing age-restricted content:</p>
                    <ul>
                      <li data-translate="Age self-declaration during registration">Age self-declaration during registration</li>
                      <li data-translate="Periodic re-confirmation prompts">Periodic re-confirmation prompts</li>
                      <li data-translate="Content warnings and age gates">Content warnings and age gates</li>
                      <li data-translate="Limited to non-uploading, viewing-only access">Limited to non-uploading, viewing-only access</li>
                    </ul>
                  </div>
                </div>
                
                <div class="tier">
                  <div class="tier-header">
                    <div class="tier-badge" data-translate="Tier 2">Tier 2</div>
                    <h5 data-translate="Document Verification (Creators)">Document Verification (Creators)</h5>
                  </div>
                  <div class="tier-content">
                    <p data-translate="Mandatory for all content creators:">Mandatory for all content creators:</p>
                    <ul>
                      <li data-translate="Government-issued photo ID submission">Government-issued photo ID submission</li>
                      <li data-translate="Real-time biometric selfie comparison">Real-time biometric selfie comparison</li>
                      <li data-translate="Document authenticity checks">Document authenticity checks</li>
                      <li data-translate="Age extraction and verification">Age extraction and verification</li>
                      <li data-translate="Annual re-verification requirement">Annual re-verification requirement</li>
                    </ul>
                  </div>
                </div>
                
                <div class="tier">
                  <div class="tier-header">
                    <div class="tier-badge" data-translate="Tier 3">Tier 3</div>
                    <h5 data-translate="Enhanced Verification (High-Earning Creators)">Enhanced Verification (High-Earning Creators)</h5>
                  </div>
                  <div class="tier-content">
                    <p data-translate="Additional verification for creators above earning thresholds:">Additional verification for creators above earning thresholds:</p>
                    <ul>
                      <li data-translate="Enhanced document verification">Enhanced document verification</li>
                      <li data-translate="Address verification">Address verification</li>
                      <li data-translate="Background screening (where legally permitted)">Background screening (where legally permitted)</li>
                      <li data-translate="Ongoing monitoring and verification">Ongoing monitoring and verification</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="verification-providers">
                <h5 data-translate="Trusted Verification Partners">Trusted Verification Partners</h5>
                <p data-translate="We partner with industry-leading age verification providers:">We partner with industry-leading age verification providers:</p>
                <div class="providers-grid">
                  <div class="provider-info">
                    <h6 data-translate="Jumio">Jumio</h6>
                    <ul>
                      <li data-translate="ID document verification">ID document verification</li>
                      <li data-translate="Biometric face matching">Biometric face matching</li>
                      <li data-translate="Liveness detection">Liveness detection</li>
                      <li data-translate="Global document coverage">Global document coverage</li>
                    </ul>
                  </div>
                  <div class="provider-info">
                    <h6 data-translate="Veriff">Veriff</h6>
                    <ul>
                      <li data-translate="AI-powered verification">AI-powered verification</li>
                      <li data-translate="Real-time decisioning">Real-time decisioning</li>
                      <li data-translate="Fraud detection">Fraud detection</li>
                      <li data-translate="Compliance frameworks">Compliance frameworks</li>
                    </ul>
                  </div>
                  <div class="provider-info">
                    <h6 data-translate="Yoti">Yoti</h6>
                    <ul>
                      <li data-translate="Digital identity verification">Digital identity verification</li>
                      <li data-translate="Age estimation technology">Age estimation technology</li>
                      <li data-translate="Privacy-preserving design">Privacy-preserving design</li>
                      <li data-translate="GDPR-compliant processing">GDPR-compliant processing</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="verification-data-handling">
                <h5 data-translate="Data Handling in Age Verification">Data Handling in Age Verification</h5>
                <div class="data-handling-grid">
                  <div class="handling-card">
                    <h6 data-translate="What We Receive">What We Receive</h6>
                    <ul>
                      <li data-translate="Verification status (approved/denied)">Verification status (approved/denied)</li>
                      <li data-translate="Anonymized verification token">Anonymized verification token</li>
                      <li data-translate="Age confirmation (over 18/under 18)">Age confirmation (over 18/under 18)</li>
                      <li data-translate="Verification timestamp and method">Verification timestamp and method</li>
                    </ul>
                  </div>
                  <div class="handling-card">
                    <h6 data-translate="What We Don't Receive">What We Don't Receive</h6>
                    <ul>
                      <li data-translate="Actual ID document images">Actual ID document images</li>
                      <li data-translate="Full birth dates (only age confirmation)">Full birth dates (only age confirmation)</li>
                      <li data-translate="Address information from IDs">Address information from IDs</li>
                      <li data-translate="Biometric templates or raw data">Biometric templates or raw data</li>
                    </ul>
                  </div>
                  <div class="handling-card">
                    <h6 data-translate="Provider Data Retention">Provider Data Retention</h6>
                    <ul>
                      <li data-translate="ID documents: 30 days minimum (legal requirement)">ID documents: 30 days minimum (legal requirement)</li>
                      <li data-translate="Biometric data: Immediate deletion after verification">Biometric data: Immediate deletion after verification</li>
                      <li data-translate="Audit logs: 5-7 years for compliance">Audit logs: 5-7 years for compliance</li>
                      <li data-translate="Verification records: As required by law">Verification records: As required by law</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="legal-compliance-age">
                <h5 data-translate="Legal Compliance Framework">Legal Compliance Framework</h5>
                <div class="compliance-grid-age">
                  <div class="compliance-item">
                    <h6 data-translate="18 U.S.C. § 2257 Records">18 U.S.C. § 2257 Records</h6>
                    <p data-translate="Mandatory record-keeping for all performers appearing in adult content, including:">Mandatory record-keeping for all performers appearing in adult content, including:</p>
                    <ul>
                      <li data-translate="Name and date of birth records">Name and date of birth records</li>
                      <li data-translate="Government ID copies (secured)">Government ID copies (secured)</li>
                      <li data-translate="Content production dates">Content production dates</li>
                      <li data-translate="7-year retention minimum">7-year retention minimum</li>
                    </ul>
                  </div>
                  <div class="compliance-item">
                    <h6 data-translate="International Requirements">International Requirements</h6>
                    <p data-translate="Compliance with global age verification laws:">Compliance with global age verification laws:</p>
                    <ul>
                      <li data-translate="UK Digital Economy Act 2017">UK Digital Economy Act 2017</li>
                      <li data-translate="Australian Online Safety Act">Australian Online Safety Act</li>
                      <li data-translate="Various US state laws">Various US state laws</li>
                      <li data-translate="EU content regulations">EU content regulations</li>
                    </ul>
                  </div>
                  <div class="compliance-item">
                    <h6 data-translate="Data Protection">Data Protection</h6>
                    <p data-translate="Age verification data protection measures:">Age verification data protection measures:</p>
                    <ul>
                      <li data-translate="GDPR-compliant processing">GDPR-compliant processing</li>
                      <li data-translate="Data minimization principles">Data minimization principles</li>
                      <li data-translate="Secure storage and access controls">Secure storage and access controls</li>
                      <li data-translate="Regular security audits">Regular security audits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 10: Children's Privacy -->
          <div class="privacy-section-expanded" id="privacy10">
            <div class="section-header">
              <div class="section-number">10</div>
              <h2 data-translate="Children's Privacy">Children's Privacy</h2>
            </div>
            
            <div class="children-privacy-strict">
              <div class="strict-header">
                <div class="strict-icon">🚫</div>
                <div class="strict-content">
                  <h4 data-translate="STRICTLY 18+ PLATFORM - NO EXCEPTIONS">STRICTLY 18+ PLATFORM - NO EXCEPTIONS</h4>
                  <p data-translate="OMINHUB is exclusively for adults 18 years of age and older. We do not knowingly collect, use, or disclose personal information from children under 18.">OMINHUB is exclusively for adults 18 years of age and older. We do not knowingly collect, use, or disclose personal information from children under 18.</p>
                </div>
              </div>
              
              <div class="protection-measures">
                <h5 data-translate="Multi-Layered Protection Measures">Multi-Layered Protection Measures</h5>
                <div class="measures-grid">
                  <div class="measure-item">
                    <h6 data-translate="Age Declaration & Verification">Age Declaration & Verification</h6>
                    <p data-translate="All users must declare they are 18+ during registration. Creators undergo rigorous age verification.">All users must declare they are 18+ during registration. Creators undergo rigorous age verification.</p>
                  </div>
                  <div class="measure-item">
                    <h6 data-translate="Content Age Gates">Content Age Gates</h6>
                    <p data-translate="All content is behind age verification gates requiring confirmation of adult status.">All content is behind age verification gates requiring confirmation of adult status.</p>
                  </div>
                  <div class="measure-item">
                    <h6 data-translate="Regular Age Checks">Regular Age Checks</h6>
                    <p data-translate="Periodic re-verification prompts and age confirmation requests.">Periodic re-verification prompts and age confirmation requests.</p>
                  </div>
                  <div class="measure-item">
                    <h6 data-translate="Reporting Mechanisms">Reporting Mechanisms</h6>
                    <p data-translate="Easy reporting of suspected underage users with immediate investigation.">Easy reporting of suspected underage users with immediate investigation.</p>
                  </div>
                </div>
              </div>
              
              <div class="parental-responsibility">
                <h5 data-translate="Parental & Guardian Information">Parental & Guardian Information</h5>
                <div class="responsibility-content">
                  <p data-translate="If you are a parent or guardian and believe your child has provided personal information to OMINHUB:">If you are a parent or guardian and believe your child has provided personal information to OMINHUB:</p>
                  <ol>
                    <li><strong data-translate="Immediate Report:">Immediate Report:</strong> <span data-translate="Contact us immediately at safety@ominhub.com">Contact us immediately at <strong>safety@ominhub.com</strong></span></li>
                    <li><strong data-translate="Provide Information:">Provide Information:</strong> <span data-translate="Include the username or email used by the child">Include the username or email used by the child</span></li>
                    <li><strong data-translate="Verification:">Verification:</strong> <span data-translate="We may request verification of parental/guardian status">We may request verification of parental/guardian status</span></li>
                    <li><strong data-translate="Immediate Action:">Immediate Action:</strong> <span data-translate="We will immediately investigate and take appropriate action">We will immediately investigate and take appropriate action</span></li>
                  </ol>
                </div>
              </div>
              
              <div class="underage-response">
                <h5 data-translate="Our Response to Underage Discovery">Our Response to Underage Discovery</h5>
                <div class="response-steps">
                  <div class="response-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h6 data-translate="Immediate Account Suspension">Immediate Account Suspension</h6>
                      <p data-translate="Account immediately suspended pending investigation">Account immediately suspended pending investigation</p>
                    </div>
                  </div>
                  <div class="response-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h6 data-translate="Data Deletion">Data Deletion</h6>
                      <p data-translate="All personal data of underage users immediately deleted">All personal data of underage users immediately deleted</p>
                    </div>
                  </div>
                  <div class="response-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h6 data-translate="Parental Notification">Parental Notification</h6>
                      <p data-translate="Parents/guardians notified where appropriate and legally permitted">Parents/guardians notified where appropriate and legally permitted</p>
                    </div>
                  </div>
                  <div class="response-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h6 data-translate="Prevention Measures">Prevention Measures</h6>
                      <p data-translate="Implementation of additional prevention measures based on findings">Implementation of additional prevention measures based on findings</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="educational-resources">
                <h5 data-translate="Educational Resources">Educational Resources</h5>
                <p data-translate="We provide resources for parents and educators about online safety:">We provide resources for parents and educators about online safety:</p>
                <div class="resources-links">
                  <a href="https://www.commonsensemedia.org" target="_blank" class="resource-link" data-translate="Common Sense Media">Common Sense Media</a>
                  <a href="https://www.connectsafely.org" target="_blank" class="resource-link" data-translate="ConnectSafely">ConnectSafely</a>
                  <a href="https://www.fosi.org" target="_blank" class="resource-link" data-translate="Family Online Safety Institute">Family Online Safety Institute</a>
                  <a href="https://www.netsmartz.org" target="_blank" class="resource-link" data-translate="NetSmartz">NetSmartz</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 11: Cookies & Tracking -->
          <div class="privacy-section-expanded" id="privacy11">
            <div class="section-header">
              <div class="section-number">11</div>
              <h2 data-translate="Cookies & Tracking Technologies">Cookies & Tracking Technologies</h2>
            </div>
            
            <div class="cookies-overview">
              <h4 data-translate="Comprehensive Cookie & Tracking Policy">🍪 Comprehensive Cookie & Tracking Policy</h4>
              <p data-translate="We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and support our operations.">We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and support our operations.</p>
              
              <div class="cookie-categories">
                <div class="category">
                  <div class="category-header essential">
                    <h5 data-translate="Essential Cookies">Essential Cookies</h5>
                    <span class="cookie-status" data-translate="Required">Required</span>
                  </div>
                  <div class="category-content">
                    <p data-translate="Necessary for platform functionality:">Necessary for platform functionality:</p>
                    <ul>
                      <li data-translate="Session management and authentication">Session management and authentication</li>
                      <li data-translate="Security and fraud prevention">Security and fraud prevention</li>
                      <li data-translate="Load balancing and performance">Load balancing and performance</li>
                      <li data-translate="Age verification status">Age verification status</li>
                    </ul>
                    <div class="cookie-notice" data-translate="Cannot be disabled without affecting functionality">Cannot be disabled without affecting functionality</div>
                  </div>
                </div>
                
                <div class="category">
                  <div class="category-header functional">
                    <h5 data-translate="Functional Cookies">Functional Cookies</h5>
                    <span class="cookie-status" data-translate="Optional">Optional</span>
                  </div>
                  <div class="category-content">
                    <p data-translate="Enhance user experience:">Enhance user experience:</p>
                    <ul>
                      <li data-translate="Language and region preferences">Language and region preferences</li>
                      <li data-translate="Content and display settings">Content and display settings</li>
                      <li data-translate="Personalization features">Personalization features</li>
                      <li data-translate="Remembering login preferences">Remembering login preferences</li>
                    </ul>
                    <div class="cookie-notice" data-translate="Can be disabled in settings">Can be disabled in settings</div>
                  </div>
                </div>
                
                <div class="category">
                  <div class="category-header analytics">
                    <h5 data-translate="Analytics Cookies">Analytics Cookies</h5>
                    <span class="cookie-status" data-translate="Optional">Optional</span>
                  </div>
                  <div class="category-content">
                    <p data-translate="Help us understand platform usage:">Help us understand platform usage:</p>
                    <ul>
                      <li data-translate="Visitor counts and demographics">Visitor counts and demographics</li>
                      <li data-translate="Feature usage and popularity">Feature usage and popularity</li>
                      <li data-translate="Performance monitoring">Performance monitoring</li>
                      <li data-translate="Error tracking and debugging">Error tracking and debugging</li>
                    </ul>
                    <div class="cookie-notice" data-translate="Anonymized data only">Anonymized data only</div>
                  </div>
                </div>
                
                <div class="category">
                  <div class="category-header advertising">
                    <h5 data-translate="Advertising Cookies">Advertising Cookies</h5>
                    <span class="cookie-status" data-translate="Optional">Optional</span>
                  </div>
                  <div class="category-content">
                    <p data-translate="Support platform operations:">Support platform operations:</p>
                    <ul>
                      <li data-translate="Content recommendations">Content recommendations</li>
                      <li data-translate="Creator promotion">Creator promotion</li>
                      <li data-translate="Platform feature announcements">Platform feature announcements</li>
                      <li data-translate="Performance-based advertising">Performance-based advertising</li>
                    </ul>
                    <div class="cookie-notice" data-translate="No third-party advertising networks">No third-party advertising networks</div>
                  </div>
                </div>
              </div>
              
              <div class="cookie-controls-section">
                <h5 data-translate="Cookie Controls & Management">Cookie Controls & Management</h5>
                <div class="controls-info">
                  <p data-translate="You can control cookies through:">You can control cookies through:</p>
                  <div class="control-options">
                    <div class="option">
                      <h6 data-translate="Browser Settings">Browser Settings</h6>
                      <p data-translate="Most browsers allow you to control cookies through settings. Disabling cookies may affect platform functionality.">Most browsers allow you to control cookies through settings. Disabling cookies may affect platform functionality.</p>
                    </div>
                    <div class="option">
                      <h6 data-translate="Platform Settings">Platform Settings</h6>
                      <p data-translate="Manage cookie preferences through your account settings or our Cookie Policy page.">Manage cookie preferences through your account settings or our <a href="#" data-nav="cookies" data-translate="Cookie Policy page">Cookie Policy page</a>.</p>
                    </div>
                    <div class="option">
                      <h6 data-translate="Do Not Track (DNT)">Do Not Track (DNT)</h6>
                      <p data-translate="We respect DNT browser signals and minimize tracking when DNT is enabled.">We respect DNT browser signals and minimize tracking when DNT is enabled.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="third-party-tracking">
                <h5 data-translate="Third-Party Tracking & Integration">Third-Party Tracking & Integration</h5>
                <div class="tracking-info">
                  <p data-translate="We may integrate with third-party services that use their own tracking technologies:">We may integrate with third-party services that use their own tracking technologies:</p>
                  <div class="services-grid">
                    <div class="service">
                      <h6 data-translate="Payment Processors">Payment Processors</h6>
                      <p data-translate="Stripe, PayPal (transaction tracking only)">Stripe, PayPal (transaction tracking only)</p>
                    </div>
                    <div class="service">
                      <h6 data-translate="Analytics Services">Analytics Services</h6>
                      <p data-translate="Google Analytics (anonymized data)">Google Analytics (anonymized data)</p>
                    </div>
                    <div class="service">
                      <h6 data-translate="Support Tools">Support Tools</h6>
                      <p data-translate="Customer service platforms">Customer service platforms</p>
                    </div>
                    <div class="service">
                      <h6 data-translate="Security Services">Security Services</h6>
                      <p data-translate="Fraud prevention and security monitoring">Fraud prevention and security monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 12: Contact & Updates -->
          <div class="privacy-section-expanded" id="privacy12">
            <div class="section-header">
              <div class="section-number">12</div>
              <h2 data-translate="Contact Information & Policy Updates">Contact Information & Policy Updates</h2>
            </div>
            
            <div class="contact-updates">
              <div class="contact-section">
                <h4 data-translate="Contact Information">📞 Contact Information</h4>
                
                <div class="contact-grid-detailed">
                  <div class="contact-card-detailed">
                    <div class="contact-header">
                      <div class="contact-icon">👨‍⚖️</div>
                      <h5 data-translate="Data Protection Officer">Data Protection Officer</h5>
                    </div>
                    <div class="contact-content">
                      <p><strong data-translate="Email:">Email:</strong> dpo@ominhub.com</p>
                      <p><strong data-translate="Purpose:">Purpose:</strong> <span data-translate="Formal data protection requests, GDPR inquiries">Formal data protection requests, GDPR inquiries</span></p>
                      <p><strong data-translate="Response Time:">Response Time:</strong> <span data-translate="30 days for formal requests">30 days for formal requests</span></p>
                      <p class="contact-note" data-translate="For EU residents exercising GDPR rights">For EU residents exercising GDPR rights</p>
                    </div>
                  </div>
                  
                  <div class="contact-card-detailed">
                    <div class="contact-header">
                      <div class="contact-icon">📧</div>
                      <h5 data-translate="General Privacy Inquiries">General Privacy Inquiries</h5>
                    </div>
                    <div class="contact-content">
                      <p><strong data-translate="Email:">Email:</strong> privacy@ominhub.com</p>
                      <p><strong data-translate="Purpose:">Purpose:</strong> <span data-translate="General privacy questions, rights requests">General privacy questions, rights requests</span></p>
                      <p><strong data-translate="Response Time:">Response Time:</strong> <span data-translate="72 hours for general inquiries">72 hours for general inquiries</span></p>
                      <p class="contact-note" data-translate="Include your username for faster service">Include your username for faster service</p>
                    </div>
                  </div>
                  
                  <div class="contact-card-detailed">
                    <div class="contact-header">
                      <div class="contact-icon">⚖️</div>
                      <h5 data-translate="Legal Department">Legal Department</h5>
                    </div>
                    <div class="contact-content">
                      <p><strong data-translate="Email:">Email:</strong> legal@ominhub.com</p>
                      <p><strong data-translate="Purpose:">Purpose:</strong> <span data-translate="Legal requests, law enforcement inquiries">Legal requests, law enforcement inquiries</span></p>
                      <p><strong data-translate="Response Time:">Response Time:</strong> <span data-translate="5 business days for legal matters">5 business days for legal matters</span></p>
                      <p class="contact-note" data-translate="Official requests must be on letterhead">Official requests must be on letterhead</p>
                    </div>
                  </div>
                  
                  <div class="contact-card-detailed">
                    <div class="contact-header">
                      <div class="contact-icon">🏢</div>
                      <h5 data-translate="Registered Office">Registered Office</h5>
                    </div>
                    <div class="contact-content">
                      <p><strong data-translate="Address:">Address:</strong> <span data-translate="OMINHUB Inc.">OMINHUB Inc.</span></p>
                      <p data-translate="San José, Costa Rica">San José, Costa Rica</p>
                      <p><strong data-translate="Registration:">Registration:</strong> <span data-translate="Registered in Costa Rica">Registered in Costa Rica</span></p>
                      <p><strong data-translate="Tax ID:">Tax ID:</strong> <span data-translate="3-101-123456">3-101-123456</span></p>
                      <p class="contact-note" data-translate="Physical mail by appointment only">Physical mail by appointment only</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="updates-section">
                <h4 data-translate="Policy Updates & Changes">🔄 Policy Updates & Changes</h4>
                
                <div class="update-process">
                  <h5 data-translate="Our Update Process">Our Update Process</h5>
                  <div class="process-steps">
                    <div class="process-step">
                      <div class="step-icon">1</div>
                      <div class="step-content">
                        <h6 data-translate="Regular Review">Regular Review</h6>
                        <p data-translate="We review this policy quarterly and update as needed based on legal changes, platform developments, or user feedback.">We review this policy quarterly and update as needed based on legal changes, platform developments, or user feedback.</p>
                      </div>
                    </div>
                    <div class="process-step">
                      <div class="step-icon">2</div>
                      <div class="step-content">
                        <h6 data-translate="User Notification">User Notification</h6>
                        <p data-translate="Significant changes are communicated to users via email and platform notifications at least 30 days before taking effect.">Significant changes are communicated to users via email and platform notifications at least 30 days before taking effect.</p>
                      </div>
                    </div>
                    <div class="process-step">
                      <div class="step-icon">3</div>
                      <div class="step-content">
                        <h6 data-translate="Continued Use">Continued Use</h6>
                        <p data-translate="Continued use of OMINHUB after changes take effect constitutes acceptance of the updated policy.">Continued use of OMINHUB after changes take effect constitutes acceptance of the updated policy.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="change-log">
                  <h5 data-translate="Recent Policy Updates">Recent Policy Updates</h5>
                  <div class="log-entries">
                    <div class="log-entry">
                      <div class="log-date">${currentDate}</div>
                      <div class="log-content">
                        <h6 data-translate="Comprehensive Privacy Policy Update">Comprehensive Privacy Policy Update</h6>
                        <p data-translate="Expanded details on data processing, international transfers, and user rights. Enhanced age verification section and security measures description.">Expanded details on data processing, international transfers, and user rights. Enhanced age verification section and security measures description.</p>
                      </div>
                    </div>
                    <div class="log-entry">
                      <div class="log-date" data-translate="Previous: Q4 2024">Previous: Q4 2024</div>
                      <div class="log-content">
                        <h6 data-translate="GDPR Compliance Enhancement">GDPR Compliance Enhancement</h6>
                        <p data-translate="Added Data Protection Officer contact, enhanced data subject rights procedures, updated international transfer mechanisms.">Added Data Protection Officer contact, enhanced data subject rights procedures, updated international transfer mechanisms.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="supervisory-authorities">
                <h5 data-translate="Supervisory Authorities">Supervisory Authorities</h5>
                <div class="authorities-info">
                  <p data-translate="You have the right to lodge a complaint with your local supervisory authority if you believe we have violated data protection laws.">You have the right to lodge a complaint with your local supervisory authority if you believe we have violated data protection laws.</p>
                  
                  <div class="authority-links">
                    <div class="authority">
                      <h6 data-translate="European Union">European Union</h6>
                      <p data-translate="Contact your national Data Protection Authority (DPA)">Contact your national Data Protection Authority (DPA)</p>
                      <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" class="authority-link" data-translate="Find Your DPA →">Find Your DPA →</a>
                    </div>
                    <div class="authority">
                      <h6 data-translate="United Kingdom">United Kingdom</h6>
                      <p data-translate="Information Commissioner's Office (ICO)">Information Commissioner's Office (ICO)</p>
                      <a href="https://ico.org.uk" target="_blank" class="authority-link" data-translate="Visit ICO →">Visit ICO →</a>
                    </div>
                    <div class="authority">
                      <h6 data-translate="United States">United States</h6>
                      <p data-translate="Federal Trade Commission (FTC)">Federal Trade Commission (FTC)</p>
                      <a href="https://www.ftc.gov" target="_blank" class="authority-link" data-translate="Visit FTC →">Visit FTC →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="policy-acknowledgment">
              <div class="acknowledgment-content">
                <h5 data-translate="Policy Acknowledgment">Policy Acknowledgment</h5>
                <p data-translate="By using OMINHUB, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our platform.">By using OMINHUB, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any part of this policy, please discontinue use of our platform.</p>
                
                <div class="effective-info">
                  <p><strong data-translate="Effective Date:">Effective Date:</strong> ${currentDate}</p>
                  <p><strong data-translate="Last Updated:">Last Updated:</strong> ${currentDate}</p>
                  <p><strong data-translate="Policy Version:">Policy Version:</strong> 3.0</p>
                </div>
                
                <div class="final-note">
                  <p data-translate="This Privacy Policy constitutes the entire agreement between you and OMINHUB regarding privacy matters and supersedes all previous versions.">This Privacy Policy constitutes the entire agreement between you and OMINHUB regarding privacy matters and supersedes all previous versions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    // Aplicar traducciones inmediatamente después de renderizar
    const currentLang = Storage.getStored("ominhub_lang", "en");
    I18n.translateUI(currentLang);

    // Guardar textos originales para futuras traducciones
    I18n.saveOriginalTexts();

    // Add smooth scrolling for navigation links
    document.querySelectorAll('.quick-nav-item, .privacy-toc-detailed a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add functionality to right action buttons
    document.querySelectorAll('.right-action-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // The onclick handlers are already set in the HTML
            // This ensures they work even if the onclick attribute fails
            const originalOnClick = this.getAttribute('onclick');
            if (originalOnClick) {
                eval(originalOnClick);
            }
        });
    });

    Router.wireNavigation();
}

export const Privacy = {
    renderPrivacy
}