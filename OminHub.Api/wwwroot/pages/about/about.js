import { I18n } from "../../features/i18n.js";
import { Router } from "../../utils/router.js";

function renderAbout(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large about-main-container">
        <div class="about-wrapper">
          <h1 data-translate="About OMINHUB">🏛️ About OMINHUB</h1>
          <p class="section-subtitle" data-translate="Redefining digital content creation through innovation, safety, and creator empowerment.">Redefining digital content creation through innovation, safety, and creator empowerment.</p>
          
        <!-- Hero Section -->
        <div class="about-hero">
          <div class="hero-content">
            <h2 data-translate="Welcome to OMINHUB">Welcome to OMINHUB</h2>
            <p class="hero-description" data-translate="OMINHUB is a next-generation digital platform that bridges the gap between content creators and engaged audiences. We provide a technologically advanced, secure, and creator-focused ecosystem for adult entertainment, creative expression, and community building.">OMINHUB is a next-generation digital platform that bridges the gap between content creators and engaged audiences. We provide a technologically advanced, secure, and creator-focused ecosystem for adult entertainment, creative expression, and community building.</p>
            <div class="hero-stats">
              <div class="hero-stat">
                <div class="stat-number">2026</div>
                <div class="stat-label" data-translate="Founded">Founded</div>
              </div>
              <div class="hero-stat">
                <div class="stat-number">50+</div>
                <div class="stat-label" data-translate="Countries Served">Countries Served</div>
              </div>
              <div class="hero-stat">
                <div class="stat-number">10,000+</div>
                <div class="stat-label" data-translate="Active Creators">Active Creators</div>
              </div>
              <div class="hero-stat">
                <div class="stat-number">5M+</div>
                <div class="stat-label" data-translate="Monthly Users">Monthly Users</div>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="visual-badge">🎬</div>
            <p data-translate="Where creativity meets opportunity">Where creativity meets opportunity</p>
          </div>
        </div>
        
        <!-- Mission & Vision -->
        <div class="about-mission-vision">
          <div class="mission-card">
            <div class="mission-icon">🎯</div>
            <h3 data-translate="Our Mission">Our Mission</h3>
            <p data-translate="To democratize content creation by providing independent creators with professional-grade tools, fair monetization, and a safe platform to share their work with global audiences.">To democratize content creation by providing independent creators with professional-grade tools, fair monetization, and a safe platform to share their work with global audiences.</p>
            <ul class="mission-points">
              <li data-translate="Empower creators with 80% revenue share">Empower creators with 80% revenue share</li>
              <li data-translate="Ensure platform safety through advanced verification">Ensure platform safety through advanced verification</li>
              <li data-translate="Foster authentic creator-viewer connections">Foster authentic creator-viewer connections</li>
              <li data-translate="Promote creative freedom within legal boundaries">Promote creative freedom within legal boundaries</li>
            </ul>
          </div>
          
          <div class="vision-card">
            <div class="vision-icon">🚀</div>
            <h3 data-translate="Our Vision">Our Vision</h3>
            <p data-translate="To become the world's most trusted and innovative platform for adult content creators, setting new standards for creator rights, viewer experience, and digital safety.">To become the world's most trusted and innovative platform for adult content creators, setting new standards for creator rights, viewer experience, and digital safety.</p>
            <ul class="vision-points">
              <li data-translate="Global expansion to 100+ countries by 2026">Global expansion to 100+ countries by 2026</li>
              <li data-translate="Introduce blockchain-based content ownership">Introduce blockchain-based content ownership</li>
              <li data-translate="Develop AI-powered creator assistance tools">Develop AI-powered creator assistance tools</li>
              <li data-translate="Launch educational programs for creators">Launch educational programs for creators</li>
            </ul>
          </div>
        </div>
        
        <!-- Core Values -->
        <div class="about-values">
          <h2 data-translate="Our Core Values">💎 Our Core Values</h2>
          <p class="values-intro" data-translate="These principles guide every decision we make and every feature we build.">These principles guide every decision we make and every feature we build.</p>
          
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">🤝</div>
              <h3 data-translate="Creator First">Creator First</h3>
              <p data-translate="Creators are our priority. We build tools that empower, features that monetize, and policies that protect.">Creators are our priority. We build tools that empower, features that monetize, and policies that protect.</p>
              <div class="value-manifest">
                <span data-translate="• 80% creator revenue share">• 80% creator revenue share</span>
                <span data-translate="• Transparent payout system">• Transparent payout system</span>
                <span data-translate="• Creator advisory board">• Creator advisory board</span>
              </div>
            </div>
            
            <div class="value-card">
              <div class="value-icon">🛡️</div>
              <h3 data-translate="Safety & Compliance">Safety & Compliance</h3>
              <p data-translate="We implement industry-leading security measures and strict age verification to protect all users.">We implement industry-leading security measures and strict age verification to protect all users.</p>
              <div class="value-manifest">
                <span data-translate="• Mandatory age verification">• Mandatory age verification</span>
                <span data-translate="• Advanced content moderation">• Advanced content moderation</span>
                <span data-translate="• Legal compliance worldwide">• Legal compliance worldwide</span>
              </div>
            </div>
            
            <div class="value-card">
              <div class="value-icon">⚖️</div>
              <h3 data-translate="Ethical Platform">Ethical Platform</h3>
              <p data-translate="We maintain strict ethical standards while allowing creative freedom within responsible boundaries.">We maintain strict ethical standards while allowing creative freedom within responsible boundaries.</p>
              <div class="value-manifest">
                <span data-translate="• Clear content guidelines">• Clear content guidelines</span>
                <span data-translate="• Anti-exploitation policies">• Anti-exploitation policies</span>
                <span data-translate="• Support for creator rights">• Support for creator rights</span>
              </div>
            </div>
            
            <div class="value-card">
              <div class="value-icon">🔬</div>
              <h3 data-translate="Innovation">Innovation</h3>
              <p data-translate="We continuously invest in technology to improve creator tools, viewer experience, and platform security.">We continuously invest in technology to improve creator tools, viewer experience, and platform security.</p>
              <div class="value-manifest">
                <span data-translate="• R&D dedicated team">• R&D dedicated team</span>
                <span data-translate="• Regular feature updates">• Regular feature updates</span>
                <span data-translate="• Tech partnerships">• Tech partnerships</span>
              </div>
            </div>
            
            <div class="value-card">
              <div class="value-icon">🌍</div>
              <h3 data-translate="Global Community">Global Community</h3>
              <p data-translate="We celebrate diversity and create an inclusive environment for creators and viewers worldwide.">We celebrate diversity and create an inclusive environment for creators and viewers worldwide.</p>
              <div class="value-manifest">
                <span data-translate="• Multi-language support">• Multi-language support</span>
                <span data-translate="• Localized payment methods">• Localized payment methods</span>
                <span data-translate="• Cultural sensitivity training">• Cultural sensitivity training</span>
              </div>
            </div>
            
            <div class="value-card">
              <div class="value-icon">📊</div>
              <h3 data-translate="Transparency">Transparency</h3>
              <p data-translate="We believe in clear communication about policies, earnings, and platform changes.">We believe in clear communication about policies, earnings, and platform changes.</p>
              <div class="value-manifest">
                <span data-translate="• Open earnings reports">• Open earnings reports</span>
                <span data-translate="• Clear terms of service">• Clear terms of service</span>
                <span data-translate="• Regular platform updates">• Regular platform updates</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Platform Technology -->
        <div class="about-technology">
          <h2 data-translate="Platform Technology">🔬 Platform Technology</h2>
          <p class="tech-intro" data-translate="Built with cutting-edge technology to ensure security, scalability, and performance.">Built with cutting-edge technology to ensure security, scalability, and performance.</p>
          
          <div class="tech-stack">
            <div class="tech-category">
              <h3 data-translate="Security Infrastructure">🛡️ Security Infrastructure</h3>
              <div class="tech-items">
                <div class="tech-item">
                  <h4 data-translate="Age Verification System">Age Verification System</h4>
                  <p data-translate="AI-powered identity verification with liveness detection and document validation.">AI-powered identity verification with liveness detection and document validation.</p>
                </div>
                <div class="tech-item">
                  <h4 data-translate="Content Protection">Content Protection</h4>
                  <p data-translate="Digital watermarking, DRM, and anti-piracy measures to protect creator content.">Digital watermarking, DRM, and anti-piracy measures to protect creator content.</p>
                </div>
                <div class="tech-item">
                  <h4 data-translate="Data Encryption">Data Encryption</h4>
                  <p data-translate="End-to-end encryption for messages and AES-256 for stored content.">End-to-end encryption for messages and AES-256 for stored content.</p>
                </div>
              </div>
            </div>
            
            <div class="tech-category">
              <h3 data-translate="Performance & Scalability">⚡ Performance & Scalability</h3>
              <div class="tech-items">
                <div class="tech-item">
                  <h4 data-translate="Cloud Infrastructure">Cloud Infrastructure</h4>
                  <p data-translate="AWS and Cloudflare CDN for global content delivery with 99.9% uptime.">AWS and Cloudflare CDN for global content delivery with 99.9% uptime.</p>
                </div>
                <div class="tech-item">
                  <h4 data-translate="Video Processing">Video Processing</h4>
                  <p data-translate="4K video transcoding, adaptive bitrate streaming, and real-time compression.">4K video transcoding, adaptive bitrate streaming, and real-time compression.</p>
                </div>
                <div class="tech-item">
                  <h4 data-translate="Database Architecture">Database Architecture</h4>
                  <p data-translate="Distributed databases handling 10,000+ transactions per second.">Distributed databases handling 10,000+ transactions per second.</p>
                </div>
              </div>
            </div>
            
            <div class="tech-category">
              <h3 data-translate="AI & Machine Learning">🤖 AI & Machine Learning</h3>
              <div class="tech-items">
                <div class="tech-item">
                  <h4 data-translate="Content Moderation">Content Moderation</h4>
                  <p data-translate="AI models trained to detect prohibited content with 98% accuracy.">AI models trained to detect prohibited content with 98% accuracy.</p>
                </div>
                <div class="tech-item">
                  <h4 data-translate="Recommendation Engine">Recommendation Engine</h4>
                  <p data-translate="Personalized content suggestions based on viewing patterns.">Personalized content suggestions based on viewing patterns.</p>
                </div>
                <div class="tech-item">
                  <h4 data-translate="Analytics Insights">Analytics Insights</h4>
                  <p data-translate="Predictive analytics for creator earnings and audience growth.">Predictive analytics for creator earnings and audience growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Company Timeline -->
        <div class="about-timeline">
          <h2 data-translate="Our Journey">📅 Our Journey</h2>
          
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">Q1 2024</div>
              <div class="timeline-content">
                <h3 data-translate="Platform Launch">Platform Launch</h3>
                <p data-translate="OMINHUB officially launched with basic creator tools and payment processing.">OMINHUB officially launched with basic creator tools and payment processing.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-date">Q2 2024</div>
              <div class="timeline-content">
                <h3 data-translate="Age Verification System">Age Verification System</h3>
                <p data-translate="Implemented mandatory age verification for all creators and enhanced content moderation.">Implemented mandatory age verification for all creators and enhanced content moderation.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-date">Q3 2024</div>
              <div class="timeline-content">
                <h3 data-translate="Mobile Apps Release">Mobile Apps Release</h3>
                <p data-translate="Launched iOS and Android apps with full creator functionality.">Launched iOS and Android apps with full creator functionality.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-date">Q4 2024</div>
              <div class="timeline-content">
                <h3 data-translate="International Expansion">International Expansion</h3>
                <p data-translate="Added support for 10+ languages and localized payment methods.">Added support for 10+ languages and localized payment methods.</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-date">Q1 2025</div>
              <div class="timeline-content">
                <h3 data-translate="Advanced Analytics Suite">Advanced Analytics Suite</h3>
                <p data-translate="Released professional analytics tools for creators with real-time insights.">Released professional analytics tools for creators with real-time insights.</p>
              </div>
            </div>
            
            <div class="timeline-item future">
              <div class="timeline-date">2026</div>
              <div class="timeline-content">
                <h3 data-translate="Future Roadmap">Future Roadmap</h3>
                <p data-translate="Blockchain integration, VR content support, and creator education platform.">Blockchain integration, VR content support, and creator education platform.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Team & Leadership -->
        <div class="about-team">
          <h2 data-translate="Leadership Team">👥 Leadership Team</h2>
          <p class="team-intro" data-translate="Experienced professionals from technology, entertainment, and finance industries.">Experienced professionals from technology, entertainment, and finance industries.</p>
          
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">👑</div>
              <div class="member-info">
                <h3>Alex Rivera</h3>
                <p class="member-role" data-translate="CEO & Founder">CEO & Founder</p>
                <p class="member-bio" data-translate="Former tech executive with 15+ years in platform development and creator economy.">Former tech executive with 15+ years in platform development and creator economy.</p>
              </div>
            </div>
            
            <div class="team-member">
              <div class="member-avatar">🛡️</div>
              <div class="member-info">
                <h3>Dr. Sarah Chen</h3>
                <p class="member-role" data-translate="Chief Safety Officer">Chief Safety Officer</p>
                <p class="member-bio" data-translate="Digital safety expert with background in law enforcement and content moderation.">Digital safety expert with background in law enforcement and content moderation.</p>
              </div>
            </div>
            
            <div class="team-member">
              <div class="member-avatar">💻</div>
              <div class="member-info">
                <h3>Marcus Johnson</h3>
                <p class="member-role" data-translate="CTO">CTO</p>
                <p class="member-bio" data-translate="Lead engineer from major streaming platform with expertise in scalable infrastructure.">Lead engineer from major streaming platform with expertise in scalable infrastructure.</p>
              </div>
            </div>
            
            <div class="team-member">
              <div class="member-avatar">💰</div>
              <div class="member-info">
                <h3>Isabella Rossi</h3>
                <p class="member-role" data-translate="CFO">CFO</p>
                <p class="member-bio" data-translate="Financial strategist with experience in creator monetization and global payments.">Financial strategist with experience in creator monetization and global payments.</p>
              </div>
            </div>
          </div>
          
          <div class="team-stats">
            <div class="team-stat">
              <div class="team-number">40+</div>
              <div class="team-label" data-translate="Team Members">Team Members</div>
            </div>
            <div class="team-stat">
              <div class="team-number">15</div>
              <div class="team-label" data-translate="Nationalities">Nationalities</div>
            </div>
            <div class="team-stat">
              <div class="team-number">60%</div>
              <div class="team-label" data-translate="Women in Tech Roles">Women in Tech Roles</div>
            </div>
            <div class="team-stat">
              <div class="team-number">5</div>
              <div class="team-label" data-translate="Global Offices">Global Offices</div>
            </div>
          </div>
        </div>
        
        <!-- Legal & Compliance -->
        <div class="about-compliance">
          <h2 data-translate="Legal & Compliance">⚖️ Legal & Compliance</h2>
          
          <div class="compliance-grid">
            <div class="compliance-card">
              <div class="compliance-icon">🌍</div>
              <h3 data-translate="Global Compliance">Global Compliance</h3>
              <p data-translate="We operate in compliance with international laws including:">We operate in compliance with international laws including:</p>
              <ul>
                <li>GDPR (European Union)</li>
                <li>CCPA (California, USA)</li>
                <li data-translate="Age Verification Laws">Age Verification Laws</li>
                <li data-translate="Financial regulations">Financial regulations</li>
              </ul>
            </div>
            
            <div class="compliance-card">
              <div class="compliance-icon">🤝</div>
              <h3 data-translate="Industry Partnerships">Industry Partnerships</h3>
              <p data-translate="Collaborating with organizations to improve platform safety:">Collaborating with organizations to improve platform safety:</p>
              <ul>
                <li data-translate="Age verification providers">Age verification providers</li>
                <li data-translate="Payment processors">Payment processors</li>
                <li data-translate="Safety advocacy groups">Safety advocacy groups</li>
                <li data-translate="Technology partners">Technology partners</li>
              </ul>
            </div>
            
            <div class="compliance-card">
              <div class="compliance-icon">📋</div>
              <h3 data-translate="Certifications">Certifications</h3>
              <p data-translate="Our commitment to security and quality:">Our commitment to security and quality:</p>
              <ul>
                <li>PCI DSS Level 1 (Payment Security)</li>
                <li>ISO 27001 (Information Security)</li>
                <li>SOC 2 Type II (Trust Principles)</li>
                <li data-translate="Regular security audits">Regular security audits</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Social Responsibility -->
        <div class="about-responsibility">
          <h2 data-translate="Social Responsibility">🤲 Social Responsibility</h2>
          
          <div class="responsibility-initiatives">
            <div class="initiative">
              <div class="initiative-icon">🎓</div>
              <div class="initiative-content">
                <h3 data-translate="Creator Education Program">Creator Education Program</h3>
                <p data-translate="Free workshops and resources on content creation, financial management, and online safety.">Free workshops and resources on content creation, financial management, and online safety.</p>
              </div>
            </div>
            
            <div class="initiative">
              <div class="initiative-icon">🌱</div>
              <div class="initiative-content">
                <h3 data-translate="Sustainability Commitment">Sustainability Commitment</h3>
                <p data-translate="Carbon-neutral data centers and sustainable business practices.">Carbon-neutral data centers and sustainable business practices.</p>
              </div>
            </div>
            
            <div class="initiative">
              <div class="initiative-icon">❤️</div>
              <div class="initiative-content">
                <h3 data-translate="Community Support">Community Support</h3>
                <p data-translate="Partnerships with mental health organizations and crisis support resources.">Partnerships with mental health organizations and crisis support resources.</p>
              </div>
            </div>
            
            <div class="initiative">
              <div class="initiative-icon">⚖️</div>
              <div class="initiative-content">
                <h3 data-translate="Ethical Standards">Ethical Standards</h3>
                <p data-translate="Transparent policies and fair treatment for all creators regardless of size or earnings.">Transparent policies and fair treatment for all creators regardless of size or earnings.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contact & Press -->
        <div class="about-contact">
          <h2 data-translate="Contact Information">📞 Contact Information</h2>
          
          <div class="contact-grid">
            <div class="contact-info">
              <h3 data-translate="General Inquiries">General Inquiries</h3>
              <p><strong data-translate="Email:">Email:</strong> hello@ominhub.com</p>
              <p><strong data-translate="Phone:">Phone:</strong> +1 (555) 123-OMIN</p>
              <p><strong data-translate="Hours:">Hours:</strong> <span data-translate="24/7 support available">24/7 support available</span></p>
            </div>
            
            <div class="contact-info">
              <h3 data-translate="Press & Media">Press & Media</h3>
              <p><strong data-translate="Email:">Email:</strong> press@ominhub.com</p>
              <p><strong data-translate="Media Kit:">Media Kit:</strong> <span data-translate="Available upon request">Available upon request</span></p>
              <p><strong data-translate="Interviews:">Interviews:</strong> <span data-translate="Contact for scheduling">Contact for scheduling</span></p>
            </div>
            
            <div class="contact-info">
              <h3 data-translate="Legal Department">Legal Department</h3>
              <p><strong data-translate="Email:">Email:</strong> legal@ominhub.com</p>
              <p><strong>DMCA:</strong> dmca@ominhub.com</p>
              <p><strong data-translate="Response:">Response:</strong> <span data-translate="Within 48 hours">Within 48 hours</span></p>
            </div>
            
            <div class="contact-info">
              <h3 data-translate="Creators Support">Creators Support</h3>
              <p><strong data-translate="Email:">Email:</strong> creators@ominhub.com</p>
              <p><strong data-translate="Help Center:">Help Center:</strong> <a href="#" data-nav="support" data-translate="Visit Support">Visit Support</a></p>
              <p><strong data-translate="Priority:">Priority:</strong> <span data-translate="24/7 creator support">24/7 creator support</span></p>
            </div>
          </div>
          
          <div class="office-locations">
            <h3 data-translate="Office Locations">🏢 Office Locations</h3>
            <div class="locations-grid">
              <div class="location">
                <h4 data-translate="Headquarters">Headquarters</h4>
                <p data-translate="San José, Costa Rica">San José, Costa Rica</p>
                <p class="location-note" data-translate="Technology & Operations">Technology & Operations</p>
              </div>
              <div class="location">
                <h4 data-translate="North America">North America</h4>
                <p data-translate="Miami, Florida, USA">Miami, Florida, USA</p>
                <p class="location-note" data-translate="Business Development">Business Development</p>
              </div>
              <div class="location">
                <h4 data-translate="Europe">Europe</h4>
                <p data-translate="Berlin, Germany">Berlin, Germany</p>
                <p class="location-note" data-translate="Compliance & Legal">Compliance & Legal</p>
              </div>
              <div class="location">
                <h4 data-translate="Asia Pacific">Asia Pacific</h4>
                <p data-translate="Singapore">Singapore</p>
                <p class="location-note" data-translate="Partnerships & Expansion">Partnerships & Expansion</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Final Message -->
        <div class="about-final-message">
          <div class="final-content">
            <h2 data-translate="Join Our Journey">Join Our Journey</h2>
            <p data-translate="Whether you're a creator looking to share your talent, a viewer seeking quality content, or a partner interested in collaboration, we invite you to be part of the OMINHUB community.">Whether you're a creator looking to share your talent, a viewer seeking quality content, or a partner interested in collaboration, we invite you to be part of the OMINHUB community.</p>
            <div class="final-cta">
              <button class="nav-button" data-nav="creators" data-translate="Become a Creator">Become a Creator</button>
              <button class="nav-button nav-button-outline" data-nav="register" data-translate="Join as Viewer">Join as Viewer</button>
              <button class="nav-button nav-button-outline" data-nav="support" data-translate="Contact Us">Contact Us</button>
            </div>
          </div>
          <div class="final-legal">
            <p><strong>OMINHUB LLC</strong> • <span data-translate="Registered in Costa Rica">Registered in Costa Rica</span> • <span data-translate="Tax ID:">Tax ID:</span> 3-101-123456</p>
            <p data-translate="© {year} OMINHUB. All rights reserved. Platform intended for adults 18+.">© ${new Date().getFullYear()} OMINHUB. All rights reserved. Platform intended for adults 18+.</p>
          </div>
        </div>
      </div>
    </section>
  `;

    // Aplicar traducciones inmediatamente después de renderizar
    const currentLang = Storage.getStored("ominhub_lang", "en");
    I18n.translateUI(currentLang);

    // Add navigation wire-up
    Router.wireNavigation();
}

export const About = {
    renderAbout
}