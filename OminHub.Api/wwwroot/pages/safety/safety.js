import { I18n } from "../../features/i18n.js";
import { Router } from "../../utils/router.js";
import { Storage } from "../../core/storage.js";

function renderSafety(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1 data-translate="🏛️ Safety & Compliance Center">🏛️ Safety & Compliance Center</h1>
        <p class="section-subtitle" data-translate="OMINHUB is committed to creating the safest possible environment for adult content creators and viewers. This center provides comprehensive safety tools, resources, and policies.">OMINHUB is committed to creating the safest possible environment for adult content creators and viewers. This center provides comprehensive safety tools, resources, and policies.</p>
        
        <!-- Safety Alert Banner -->
        <div class="safety-alert-emergency">
          <div class="safety-alert-icon">🚨</div>
          <div class="safety-alert-content">
            <h3 data-translate="Emergency Support & Immediate Threats">Emergency Support & Immediate Threats</h3>
            <div class="emergency-contacts">
              <div class="emergency-contact">
                <strong data-translate="Platform Emergency:">Platform Emergency:</strong> emergency@ominhub.com <span data-translate="(2-4 hour response)">(2-4 hour response)</span>
              </div>
              <div class="emergency-contact">
                <strong data-translate="Law Enforcement Contact:">Law Enforcement Contact:</strong> legal@ominhub.com
              </div>
              <div class="emergency-contact">
                <strong data-translate="Immediate Danger:">Immediate Danger:</strong> <span data-translate="Contact local authorities immediately">Contact local authorities immediately</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Safety Navigation -->
        <div class="safety-navigation">
          <h2 data-translate="📋 Quick Navigation">📋 Quick Navigation</h2>
          <div class="safety-nav-grid">
            <a href="#content-moderation" class="safety-nav-card">
              <div class="nav-icon">🔍</div>
              <div class="nav-title" data-translate="Content Moderation">Content Moderation</div>
              <div class="nav-desc" data-translate="How we review and monitor content">How we review and monitor content</div>
            </a>
            <a href="#age-verification" class="safety-nav-card">
              <div class="nav-icon">🆔</div>
              <div class="nav-title" data-translate="Age Verification">Age Verification</div>
              <div class="nav-desc" data-translate="Strict 18+ verification systems">Strict 18+ verification systems</div>
            </a>
            <a href="#reporting-system" class="safety-nav-card">
              <div class="nav-icon">📢</div>
              <div class="nav-title" data-translate="Reporting System">Reporting System</div>
              <div class="nav-desc" data-translate="How to report violations">How to report violations</div>
            </a>
            <a href="#legal-compliance" class="safety-nav-card">
              <div class="nav-icon">⚖️</div>
              <div class="nav-title" data-translate="Legal Compliance">Legal Compliance</div>
              <div class="nav-desc" data-translate="Regulatory frameworks we follow">Regulatory frameworks we follow</div>
            </a>
          </div>
        </div>
        
        <!-- Content Moderation Section -->
        <div class="safety-section" id="content-moderation">
          <h2 data-translate="🔍 Content Moderation & Review System">🔍 Content Moderation & Review System</h2>
          
          <div class="moderation-tiers">
            <div class="tier-card">
              <h3 data-translate="🛡️ Tier 1: AI-Powered Pre-Screening">🛡️ Tier 1: AI-Powered Pre-Screening</h3>
              <ul>
                <li data-translate="Real-time analysis of all uploaded content">Real-time analysis of all uploaded content</li>
                <li data-translate="Detection of prohibited material with 99.2% accuracy">Detection of prohibited material with 99.2% accuracy</li>
                <li data-translate="Age estimation algorithms for all visible persons">Age estimation algorithms for all visible persons</li>
                <li data-translate="Metadata analysis for compliance checks">Metadata analysis for compliance checks</li>
              </ul>
              <div class="tier-stats">
                <span data-translate="Processes: 100% of uploads">Processes: 100% of uploads</span>
                <span data-translate="Response: Instant">Response: Instant</span>
              </div>
            </div>
            
            <div class="tier-card">
              <h3 data-translate="👥 Tier 2: Human Moderator Review">👥 Tier 2: Human Moderator Review</h3>
              <ul>
                <li data-translate="Trained human moderators in compliance teams">Trained human moderators in compliance teams</li>
                <li data-translate="24/7 coverage across multiple time zones">24/7 coverage across multiple time zones</li>
                <li data-translate="Cultural and contextual understanding">Cultural and contextual understanding</li>
                <li data-translate="Escalation procedures for complex cases">Escalation procedures for complex cases</li>
              </ul>
              <div class="tier-stats">
                <span data-translate="Reviews: Flagged content + random audits">Reviews: Flagged content + random audits</span>
                <span data-translate="Response: Within 24 hours">Response: Within 24 hours</span>
              </div>
            </div>
            
            <div class="tier-card">
              <h3 data-translate="⚖️ Tier 3: Legal & Compliance Team">⚖️ Tier 3: Legal & Compliance Team</h3>
              <ul>
                <li data-translate="Legal experts specializing in adult content regulations">Legal experts specializing in adult content regulations</li>
                <li data-translate="Law enforcement liaison coordination">Law enforcement liaison coordination</li>
                <li data-translate="International compliance management">International compliance management</li>
                <li data-translate="Policy development and updates">Policy development and updates</li>
              </ul>
              <div class="tier-stats">
                <span data-translate="Handles: Legal cases + policy violations">Handles: Legal cases + policy violations</span>
                <span data-translate="Response: 2-4 hours for emergencies">Response: 2-4 hours for emergencies</span>
              </div>
            </div>
          </div>
          
          <div class="moderation-policies">
            <h3 data-translate="📋 Content Moderation Policies">📋 Content Moderation Policies</h3>
            <div class="policy-grid">
              <div class="policy-card allowed">
                <h4 data-translate="✅ Permitted Content (With Verification)">✅ Permitted Content (With Verification)</h4>
                <ul>
                  <li data-translate="Consensual adult entertainment between verified adults">Consensual adult entertainment between verified adults</li>
                  <li data-translate="Educational sexual health and wellness content">Educational sexual health and wellness content</li>
                  <li data-translate="Artistic nudity and adult-themed performances">Artistic nudity and adult-themed performances</li>
                  <li data-translate="Fetish/BDSM content with proper consent documentation">Fetish/BDSM content with proper consent documentation</li>
                  <li data-translate="Adult gaming and interactive content">Adult gaming and interactive content</li>
                </ul>
              </div>
              
              <div class="policy-card prohibited">
                <h4 data-translate="🚫 Strictly Prohibited Content (Zero Tolerance)">🚫 Strictly Prohibited Content (Zero Tolerance)</h4>
                <ul>
                  <li data-translate="Child Sexual Abuse Material (CSAM) - Immediate law enforcement reporting">Child Sexual Abuse Material (CSAM) - Immediate law enforcement reporting</li>
                  <li data-translate="Non-consensual content (revenge porn, hidden cameras)">Non-consensual content (revenge porn, hidden cameras)</li>
                  <li data-translate="Content depicting real violence, torture, or death">Content depicting real violence, torture, or death</li>
                  <li data-translate="Bestiality or animal cruelty">Bestiality or animal cruelty</li>
                  <li data-translate="Content promoting hate speech, terrorism, or illegal activities">Content promoting hate speech, terrorism, or illegal activities</li>
                  <li data-translate="Any content involving minors or youth-like individuals">Any content involving minors or youth-like individuals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Age Verification Section -->
        <div class="safety-section" id="age-verification">
          <h2 data-translate="🆔 Age Verification System">🆔 Age Verification System</h2>
          
          <div class="verification-process-detailed">
            <div class="process-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4 data-translate="Government ID Verification">Government ID Verification</h4>
                <p data-translate="All creators must submit valid government-issued photo ID (passport, driver's license, national ID)">All creators must submit valid government-issued photo ID (passport, driver's license, national ID)</p>
                <ul class="step-details">
                  <li data-translate="Document authenticity checks via third-party providers (Jumio, Veriff)">Document authenticity checks via third-party providers (Jumio, Veriff)</li>
                  <li data-translate="Data extraction for age verification only">Data extraction for age verification only</li>
                  <li data-translate="Document storage: 30 days minimum for legal compliance">Document storage: 30 days minimum for legal compliance</li>
                  <li data-translate="GDPR-compliant data handling">GDPR-compliant data handling</li>
                </ul>
              </div>
            </div>
            
            <div class="process-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4 data-translate="Biometric Selfie Comparison">Biometric Selfie Comparison</h4>
                <p data-translate="Live selfie matched against ID document using facial recognition technology">Live selfie matched against ID document using facial recognition technology</p>
                <ul class="step-details">
                  <li data-translate="Liveness detection to prevent spoofing">Liveness detection to prevent spoofing</li>
                  <li data-translate="Biometric comparison with 99.8% accuracy">Biometric comparison with 99.8% accuracy</li>
                  <li data-translate="Real-time processing (2-5 minutes average)">Real-time processing (2-5 minutes average)</li>
                  <li data-translate="Selfie deletion after 7 days for privacy">Selfie deletion after 7 days for privacy</li>
                </ul>
              </div>
            </div>
            
            <div class="process-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4 data-translate="Background Database Checks">Background Database Checks</h4>
                <p data-translate="Cross-referencing against international prohibited persons databases">Cross-referencing against international prohibited persons databases</p>
                <ul class="step-details">
                  <li data-translate="INTERPOL and national law enforcement databases">INTERPOL and national law enforcement databases</li>
                  <li data-translate="Sex offender registry checks where legally permissible">Sex offender registry checks where legally permissible</li>
                  <li data-translate="OFAC and sanctions list screening">OFAC and sanctions list screening</li>
                  <li data-translate="Platform-specific banned user cross-reference">Platform-specific banned user cross-reference</li>
                </ul>
              </div>
            </div>
            
            <div class="process-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4 data-translate="Ongoing Compliance & Re-Verification">Ongoing Compliance & Re-Verification</h4>
                <p data-translate="Continuous monitoring and periodic re-verification requirements">Continuous monitoring and periodic re-verification requirements</p>
                <ul class="step-details">
                  <li data-translate="Annual re-verification for all active creators">Annual re-verification for all active creators</li>
                  <li data-translate="Trigger-based re-verification for policy violations">Trigger-based re-verification for policy violations</li>
                  <li data-translate="Payment threshold verification requirements">Payment threshold verification requirements</li>
                  <li data-translate="Geographic compliance updates">Geographic compliance updates</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="legal-requirements">
            <h3 data-translate="📜 Legal Record-Keeping Requirements">📜 Legal Record-Keeping Requirements</h3>
            <div class="legal-grid">
              <div class="legal-card">
                <h4 data-translate="18 U.S.C. § 2257 Compliance">18 U.S.C. § 2257 Compliance</h4>
                <p data-translate="Mandatory record-keeping for all performers appearing in adult content:">Mandatory record-keeping for all performers appearing in adult content:</p>
                <ul>
                  <li data-translate="Government-issued photo ID copies">Government-issued photo ID copies</li>
                  <li data-translate="Stage name to legal name cross-reference">Stage name to legal name cross-reference</li>
                  <li data-translate="Date of production records">Date of production records</li>
                  <li data-translate="7-year retention period minimum">7-year retention period minimum</li>
                </ul>
              </div>
              
              <div class="legal-card">
                <h4 data-translate="GDPR & Data Protection">GDPR & Data Protection</h4>
                <p data-translate="European Union compliance for data handling:">European Union compliance for data handling:</p>
                <ul>
                  <li data-translate="Age verification data minimization">Age verification data minimization</li>
                  <li data-translate="Right to erasure compliance">Right to erasure compliance</li>
                  <li data-translate="Data protection officer oversight">Data protection officer oversight</li>
                  <li data-translate="Secure encryption for all sensitive data">Secure encryption for all sensitive data</li>
                </ul>
              </div>
              
              <div class="legal-card">
                <h4 data-translate="International Standards">International Standards</h4>
                <p data-translate="Compliance with global regulations:">Compliance with global regulations:</p>
                <ul>
                  <li data-translate="UK Digital Economy Act 2017">UK Digital Economy Act 2017</li>
                  <li data-translate="Australian Online Safety Act">Australian Online Safety Act</li>
                  <li data-translate="Canadian Bill C-11 provisions">Canadian Bill C-11 provisions</li>
                  <li data-translate="Various US state age verification laws">Various US state age verification laws</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Reporting System -->
        <div class="safety-section" id="reporting-system">
          <h2 data-translate="📢 Reporting & Escalation System">📢 Reporting & Escalation System</h2>
          
          <div class="reporting-categories">
            <h3 data-translate="Report Categories & Response Times">Report Categories & Response Times</h3>
            
            <div class="category-grid">
              <div class="category-card emergency">
                <div class="category-header">
                  <div class="category-icon">🚨</div>
                  <div class="category-title" data-translate="Emergency Reports">Emergency Reports</div>
                </div>
                <div class="category-content">
                  <p><strong data-translate="Examples:">Examples:</strong> <span data-translate="Child exploitation, immediate danger, threats of violence">Child exploitation, immediate danger, threats of violence</span></p>
                  <div class="response-info">
                    <span class="response-label" data-translate="Response Time:">Response Time:</span>
                    <span class="response-value" data-translate="2-4 hours maximum">2-4 hours maximum</span>
                  </div>
                  <div class="reporting-method">
                    <strong data-translate="Method:">Method:</strong> <span data-translate="Email emergency@ominhub.com">Email emergency@ominhub.com</span>
                  </div>
                </div>
              </div>
              
              <div class="category-card urgent">
                <div class="category-header">
                  <div class="category-icon">⚠️</div>
                  <div class="category-title" data-translate="Urgent Reports">Urgent Reports</div>
                </div>
                <div class="category-content">
                  <p><strong data-translate="Examples:">Examples:</strong> <span data-translate="Non-consensual content, underage suspicion, harassment">Non-consensual content, underage suspicion, harassment</span></p>
                  <div class="response-info">
                    <span class="response-label" data-translate="Response Time:">Response Time:</span>
                    <span class="response-value" data-translate="24 hours maximum">24 hours maximum</span>
                  </div>
                  <div class="reporting-method">
                    <strong data-translate="Method:">Method:</strong> <span data-translate="In-app report + priority@ominhub.com">In-app report + priority@ominhub.com</span>
                  </div>
                </div>
              </div>
              
              <div class="category-card standard">
                <div class="category-header">
                  <div class="category-icon">📝</div>
                  <div class="category-title" data-translate="Standard Reports">Standard Reports</div>
                </div>
                <div class="category-content">
                  <p><strong data-translate="Examples:">Examples:</strong> <span data-translate="Copyright infringement, policy violations, spam">Copyright infringement, policy violations, spam</span></p>
                  <div class="response-info">
                    <span class="response-label" data-translate="Response Time:">Response Time:</span>
                    <span class="response-value" data-translate="48-72 hours">48-72 hours</span>
                  </div>
                  <div class="reporting-method">
                    <strong data-translate="Method:">Method:</strong> <span data-translate="In-app report function">In-app report function</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="reporting-process">
            <h3 data-translate="📋 Step-by-Step Reporting Process">📋 Step-by-Step Reporting Process</h3>
            
            <div class="report-steps-detailed">
              <div class="report-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4 data-translate="Identify & Document">Identify & Document</h4>
                  <p data-translate="Collect evidence: Screenshots, URLs, timestamps. Document all relevant details including usernames, dates, and specific violations.">Collect evidence: Screenshots, URLs, timestamps. Document all relevant details including usernames, dates, and specific violations.</p>
                  <div class="step-tip">
                    <strong data-translate="Tip:">Tip:</strong> <span data-translate="Use browser extensions for automatic metadata capture">Use browser extensions for automatic metadata capture</span>
                  </div>
                </div>
              </div>
              
              <div class="report-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4 data-translate="Use In-App Reporting">Use In-App Reporting</h4>
                  <p data-translate="Click 'Report' button on content or profile. Select appropriate category and provide detailed description.">Click "Report" button on content or profile. Select appropriate category and provide detailed description.</p>
                  <div class="step-tip">
                    <strong data-translate="Tip:">Tip:</strong> <span data-translate="Be specific about which policy is being violated">Be specific about which policy is being violated</span>
                  </div>
                </div>
              </div>
              
              <div class="report-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4 data-translate="Escalation if Needed">Escalation if Needed</h4>
                  <p data-translate="If in-app reporting is insufficient, email support with case number. Include all collected evidence and timeline.">If in-app reporting is insufficient, email support with case number. Include all collected evidence and timeline.</p>
                  <div class="step-tip">
                    <strong data-translate="Tip:">Tip:</strong> <span data-translate="Keep records of all communications">Keep records of all communications</span>
                  </div>
                </div>
              </div>
              
              <div class="report-step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4 data-translate="Follow-Up & Updates">Follow-Up & Updates</h4>
                  <p data-translate="Receive email updates on report status. Provide additional information if requested by moderation team.">Receive email updates on report status. Provide additional information if requested by moderation team.</p>
                  <div class="step-tip">
                    <strong data-translate="Tip:">Tip:</strong> <span data-translate="Check spam folder for response emails">Check spam folder for response emails</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="whistleblower-protection">
            <h3 data-translate="🛡️ Whistleblower Protection">🛡️ Whistleblower Protection</h3>
            <div class="protection-content">
              <p data-translate="OMINHUB provides protections for individuals reporting serious violations:">OMINHUB provides protections for individuals reporting serious violations:</p>
              <ul>
                <li><strong data-translate="Anonymity Options:">Anonymity Options:</strong> <span data-translate="Secure anonymous reporting channels available">Secure anonymous reporting channels available</span></li>
                <li><strong data-translate="Non-Retaliation Policy:">Non-Retaliation Policy:</strong> <span data-translate="Strict prohibition against retaliation for good-faith reports">Strict prohibition against retaliation for good-faith reports</span></li>
                <li><strong data-translate="Legal Support:">Legal Support:</strong> <span data-translate="Resources for reporters facing external threats">Resources for reporters facing external threats</span></li>
                <li><strong data-translate="Confidentiality:">Confidentiality:</strong> <span data-translate="Protection of reporter identity in all internal communications">Protection of reporter identity in all internal communications</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Legal Compliance -->
        <div class="safety-section" id="legal-compliance">
          <h2 data-translate="⚖️ Legal Compliance & Regulatory Framework">⚖️ Legal Compliance & Regulatory Framework</h2>
          
          <div class="compliance-overview">
            <h3 data-translate="🌍 International Regulatory Compliance">🌍 International Regulatory Compliance</h3>
            
            <div class="regulatory-grid">
              <div class="regulatory-card">
                <h4 data-translate="United States">United States</h4>
                <ul>
                  <li data-translate="18 U.S.C. § 2257 Record Keeping">18 U.S.C. § 2257 Record Keeping</li>
                  <li data-translate="FOSTA-SESTA Compliance">FOSTA-SESTA Compliance</li>
                  <li data-translate="State-specific age verification laws">State-specific age verification laws</li>
                  <li data-translate="DMCA Takedown Procedures">DMCA Takedown Procedures</li>
                  <li data-translate="California Consumer Privacy Act (CCPA)">California Consumer Privacy Act (CCPA)</li>
                </ul>
              </div>
              
              <div class="regulatory-card">
                <h4 data-translate="European Union">European Union</h4>
                <ul>
                  <li data-translate="General Data Protection Regulation (GDPR)">General Data Protection Regulation (GDPR)</li>
                  <li data-translate="Digital Services Act (DSA) Compliance">Digital Services Act (DSA) Compliance</li>
                  <li data-translate="Audiovisual Media Services Directive">Audiovisual Media Services Directive</li>
                  <li data-translate="e-Privacy Directive">e-Privacy Directive</li>
                  <li data-translate="Country-specific content regulations">Country-specific content regulations</li>
                </ul>
              </div>
              
              <div class="regulatory-card">
                <h4 data-translate="United Kingdom">United Kingdom</h4>
                <ul>
                  <li data-translate="Online Safety Act 2023">Online Safety Act 2023</li>
                  <li data-translate="Age Verification Regulations">Age Verification Regulations</li>
                  <li data-translate="Data Protection Act 2018">Data Protection Act 2018</li>
                  <li data-translate="Digital Economy Act 2017">Digital Economy Act 2017</li>
                  <li data-translate="ICO Guidance Compliance">ICO Guidance Compliance</li>
                </ul>
              </div>
              
              <div class="regulatory-card">
                <h4 data-translate="Global Standards">Global Standards</h4>
                <ul>
                  <li data-translate="Financial Action Task Force (FATF)">Financial Action Task Force (FATF)</li>
                  <li data-translate="ISO 27001 Information Security">ISO 27001 Information Security</li>
                  <li data-translate="PCI DSS Payment Security">PCI DSS Payment Security</li>
                  <li data-translate="Content Rating Standards">Content Rating Standards</li>
                  <li data-translate="Accessibility Compliance">Accessibility Compliance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="law-enforcement-cooperation">
            <h3 data-translate="👮‍♀️ Law Enforcement Cooperation">👮‍♀️ Law Enforcement Cooperation</h3>
            
            <div class="cooperation-guidelines">
              <div class="guideline-card">
                <h4 data-translate="Information Requests">Information Requests</h4>
                <p data-translate="Law enforcement agencies can submit requests through our legal portal. Required documentation includes:">Law enforcement agencies can submit requests through our legal portal. Required documentation includes:</p>
                <ul>
                  <li data-translate="Official agency letterhead">Official agency letterhead</li>
                  <li data-translate="Case number and jurisdiction">Case number and jurisdiction</li>
                  <li data-translate="Specific user information requested">Specific user information requested</li>
                  <li data-translate="Legal basis for request">Legal basis for request</li>
                </ul>
              </div>
              
              <div class="guideline-card">
                <h4 data-translate="Emergency Disclosure">Emergency Disclosure</h4>
                <p data-translate="For emergencies involving immediate danger to life:">For emergencies involving immediate danger to life:</p>
                <ul>
                  <li data-translate="24/7 emergency contact: legal-emergency@ominhub.com">24/7 emergency contact: legal-emergency@ominhub.com</li>
                  <li data-translate="Phone contact for verified agencies">Phone contact for verified agencies</li>
                  <li data-translate="Expedited review process">Expedited review process</li>
                  <li data-translate="Cross-border cooperation protocols">Cross-border cooperation protocols</li>
                </ul>
              </div>
              
              <div class="guideline-card">
                <h4 data-translate="Transparency Reporting">Transparency Reporting</h4>
                <p data-translate="We publish regular transparency reports including:">We publish regular transparency reports including:</p>
                <ul>
                  <li data-translate="Number of law enforcement requests">Number of law enforcement requests</li>
                  <li data-translate="Types of data disclosed">Types of data disclosed</li>
                  <li data-translate="Countries making requests">Countries making requests</li>
                  <li data-translate="Percentage of requests complied with">Percentage of requests complied with</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Safety Resources -->
        <div class="safety-section" id="safety-resources">
          <h2 data-translate="🛡️ Safety Resources & Support">🛡️ Safety Resources & Support</h2>
          
          <div class="resources-categories">
            <div class="resource-category">
              <h3 data-translate="🌐 External Safety Organizations">🌐 External Safety Organizations</h3>
              <div class="org-grid">
                <div class="org-card">
                  <h4 data-translate="National Center for Missing & Exploited Children (NCMEC)">National Center for Missing & Exploited Children (NCMEC)</h4>
                  <p data-translate="CyberTipline for reporting child exploitation">CyberTipline for reporting child exploitation</p>
                  <a href="https://www.missingkids.org/gethelpnow/cybertipline" target="_blank" class="org-link" data-translate="Visit NCMEC →">Visit NCMEC →</a>
                </div>
                
                <div class="org-card">
                  <h4 data-translate="RAINN (Rape, Abuse & Incest National Network)">RAINN (Rape, Abuse & Incest National Network)</h4>
                  <p data-translate="Sexual assault support and resources">Sexual assault support and resources</p>
                  <a href="https://www.rainn.org" target="_blank" class="org-link" data-translate="Visit RAINN →">Visit RAINN →</a>
                </div>
                
                <div class="org-card">
                  <h4 data-translate="Internet Watch Foundation (IWF)">Internet Watch Foundation (IWF)</h4>
                  <p data-translate="Reporting mechanism for criminal online content">Reporting mechanism for criminal online content</p>
                  <a href="https://www.iwf.org.uk" target="_blank" class="org-link" data-translate="Visit IWF →">Visit IWF →</a>
                </div>
                
                <div class="org-card">
                  <h4 data-translate="National Domestic Violence Hotline">National Domestic Violence Hotline</h4>
                  <p data-translate="Support for domestic violence situations">Support for domestic violence situations</p>
                  <a href="https://www.thehotline.org" target="_blank" class="org-link" data-translate="Visit Hotline →">Visit Hotline →</a>
                </div>
              </div>
            </div>
            
            <div class="resource-category">
              <h3 data-translate="📚 Educational Resources">📚 Educational Resources</h3>
              <div class="edu-grid">
                <div class="edu-card">
                  <h4 data-translate="Creator Safety Handbook">Creator Safety Handbook</h4>
                  <p data-translate="Comprehensive guide for creators on maintaining safety and privacy">Comprehensive guide for creators on maintaining safety and privacy</p>
                  <button class="download-btn" data-translate="Download PDF">Download PDF</button>
                </div>
                
                <div class="edu-card">
                  <h4 data-translate="Digital Security Checklist">Digital Security Checklist</h4>
                  <p data-translate="Step-by-step guide to securing online accounts and content">Step-by-step guide to securing online accounts and content</p>
                  <button class="download-btn" data-translate="View Checklist">View Checklist</button>
                </div>
                
                <div class="edu-card">
                  <h4 data-translate="Consent Education Materials">Consent Education Materials</h4>
                  <p data-translate="Resources on understanding and obtaining proper consent">Resources on understanding and obtaining proper consent</p>
                  <button class="download-btn" data-translate="Access Materials">Access Materials</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Safety Team & Contact -->
        <div class="safety-team-section">
          <h2 data-translate="👥 Safety Team & Contact Information">👥 Safety Team & Contact Information</h2>
          
          <div class="team-structure">
            <div class="team-department">
              <h3 data-translate="🛡️ Trust & Safety Department">🛡️ Trust & Safety Department</h3>
              <div class="team-roles">
                <div class="role-card">
                  <h4 data-translate="Content Moderation Team">Content Moderation Team</h4>
                  <p data-translate="24/7 content review and policy enforcement">24/7 content review and policy enforcement</p>
                  <div class="contact-info">
                    <strong data-translate="Email:">Email:</strong> moderation@ominhub.com
                  </div>
                </div>
                
                <div class="role-card">
                  <h4 data-translate="Legal & Compliance Team">Legal & Compliance Team</h4>
                  <p data-translate="Regulatory compliance and law enforcement liaison">Regulatory compliance and law enforcement liaison</p>
                  <div class="contact-info">
                    <strong data-translate="Email:">Email:</strong> legal@ominhub.com
                  </div>
                </div>
                
                <div class="role-card">
                  <h4 data-translate="User Support & Safety">User Support & Safety</h4>
                  <p data-translate="User education and safety resource management">User education and safety resource management</p>
                  <div class="contact-info">
                    <strong data-translate="Email:">Email:</strong> safety@ominhub.com
                  </div>
                </div>
              </div>
            </div>
            
            <div class="contact-directory">
              <h3 data-translate="📞 Contact Directory">📞 Contact Directory</h3>
              <div class="contact-grid">
                <div class="contact-card">
                  <h4 data-translate="Emergency Contact">Emergency Contact</h4>
                  <p><strong data-translate="Email:">Email:</strong> emergency@ominhub.com</p>
                  <p><strong data-translate="Response:">Response:</strong> <span data-translate="2-4 hours maximum">2-4 hours maximum</span></p>
                  <p class="contact-note" data-translate="For immediate threats and danger">For immediate threats and danger</p>
                </div>
                
                <div class="contact-card">
                  <h4 data-translate="Legal & Law Enforcement">Legal & Law Enforcement</h4>
                  <p><strong data-translate="Email:">Email:</strong> legal@ominhub.com</p>
                  <p><strong data-translate="DMCA:">DMCA:</strong> copyright@ominhub.com</p>
                  <p class="contact-note" data-translate="Official law enforcement requests only">Official law enforcement requests only</p>
                </div>
                
                <div class="contact-card">
                  <h4 data-translate="Creator Safety Support">Creator Safety Support</h4>
                  <p><strong data-translate="Email:">Email:</strong> creatorsafety@ominhub.com</p>
                  <p><strong data-translate="Hours:">Hours:</strong> <span data-translate="24/7 support available">24/7 support available</span></p>
                  <p class="contact-note" data-translate="Dedicated support for creator safety">Dedicated support for creator safety</p>
                </div>
                
                <div class="contact-card">
                  <h4 data-translate="General Safety Inquiries">General Safety Inquiries</h4>
                  <p><strong data-translate="Email:">Email:</strong> safety@ominhub.com</p>
                  <p><strong data-translate="Response:">Response:</strong> <span data-translate="24-48 hours">24-48 hours</span></p>
                  <p class="contact-note" data-translate="General safety questions and feedback">General safety questions and feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Safety Commitment -->
        <div class="safety-commitment-final">
          <div class="commitment-content">
            <h2 data-translate="Our Commitment to Safety">Our Commitment to Safety</h2>
            <p data-translate="OMINHUB is dedicated to maintaining the highest standards of safety, compliance, and user protection in the adult content industry. We invest significantly in:">OMINHUB is dedicated to maintaining the highest standards of safety, compliance, and user protection in the adult content industry. We invest significantly in:</p>
            
            <div class="commitment-grid">
              <div class="commitment-item">
                <div class="commitment-icon">💰</div>
                <div class="commitment-text">
                  <h4 data-translate="Resource Investment">Resource Investment</h4>
                  <p data-translate="15% of platform revenue dedicated to safety systems and teams">15% of platform revenue dedicated to safety systems and teams</p>
                </div>
              </div>
              
              <div class="commitment-item">
                <div class="commitment-icon">🔬</div>
                <div class="commitment-text">
                  <h4 data-translate="Technology Development">Technology Development</h4>
                  <p data-translate="Ongoing R&D in AI moderation and age verification technologies">Ongoing R&D in AI moderation and age verification technologies</p>
                </div>
              </div>
              
              <div class="commitment-item">
                <div class="commitment-icon">🤝</div>
                <div class="commitment-text">
                  <h4 data-translate="Industry Collaboration">Industry Collaboration</h4>
                  <p data-translate="Active participation in industry safety coalitions and working groups">Active participation in industry safety coalitions and working groups</p>
                </div>
              </div>
              
              <div class="commitment-item">
                <div class="commitment-icon">📊</div>
                <div class="commitment-text">
                  <h4 data-translate="Transparency">Transparency</h4>
                  <p data-translate="Regular public reporting on safety metrics and enforcement actions">Regular public reporting on safety metrics and enforcement actions</p>
                </div>
              </div>
            </div>
            
            <div class="safety-metrics">
              <h3 data-translate="Safety Metrics & Performance">Safety Metrics & Performance</h3>
              <div class="metrics-grid">
                <div class="metric">
                  <div class="metric-value">99.8%</div>
                  <div class="metric-label" data-translate="Age Verification Accuracy">Age Verification Accuracy</div>
                </div>
                <div class="metric">
                  <div class="metric-value">24h</div>
                  <div class="metric-label" data-translate="Average Report Response Time">Average Report Response Time</div>
                </div>
                <div class="metric">
                  <div class="metric-value">0.02%</div>
                  <div class="metric-label" data-translate="Policy Violation Rate">Policy Violation Rate</div>
                </div>
                <div class="metric">
                  <div class="metric-value">100%</div>
                  <div class="metric-label" data-translate="Law Enforcement Cooperation">Law Enforcement Cooperation</div>
                </div>
              </div>
            </div>
            
            <div class="update-info">
              <p><strong data-translate="Last Comprehensive Safety Audit:">Last Comprehensive Safety Audit:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              <p><strong data-translate="Next Scheduled Review:">Next Scheduled Review:</strong> ${new Date(new Date().setMonth(new Date().getMonth() + 3)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
        
        <!-- Report Button -->
        <div class="report-button-section">
          <button class="safety-report-button" onclick="window.location.href = Router.resolveHref('support')" data-translate="🚨 Report a Safety Concern">
            🚨 Report a Safety Concern
          </button>
          <p class="report-note" data-translate="All reports are taken seriously and handled confidentially.">All reports are taken seriously and handled confidentially.</p>
        </div>
        
        <!-- Legal Disclaimer -->
        <div class="legal-disclaimer">
          <h3 data-translate="⚖️ Legal Disclaimer">⚖️ Legal Disclaimer</h3>
          <p data-translate="This Safety Center provides information about OMINHUB's safety policies and procedures. It does not constitute legal advice. Users are responsible for understanding and complying with all applicable laws in their jurisdiction. OMINHUB reserves the right to modify safety policies at any time to comply with legal requirements and industry best practices.">This Safety Center provides information about OMINHUB's safety policies and procedures. It does not constitute legal advice. Users are responsible for understanding and complying with all applicable laws in their jurisdiction. OMINHUB reserves the right to modify safety policies at any time to comply with legal requirements and industry best practices.</p>
          <p><strong data-translate="Platform intended for adults 18+ only. All users must verify age where required by law.">Platform intended for adults 18+ only. All users must verify age where required by law.</strong></p>
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
    document.querySelectorAll('.safety-nav-card').forEach(link => {
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

    // Add download button functionality
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const buttonText = this.getAttribute('data-translate');
            alert(`In a real implementation, this would ${buttonText.toLowerCase()}`);
        });
    });

    Router.wireNavigation();
}

export const Safety = {
    renderSafety
}