import React from 'react'
import './PrivacyPolicy.css'
import Link from 'next/link'

const PrivacyAndPolicy = () => {
  return (
    <div className='privacy-policy-main-container'>
      <div className='privacy-policy-width-contianer'>
          <h1 className='section-main-heading'>Privacy and Cookie Policy</h1>
          <p className='global-content-style'>
            ZM Rentals (referred to as "the Company," "we," "us," or "our") maintains strong commitments to privacy protection obligations. Throughout this Privacy Statement ("Statement"), references to "you" and "your" indicate individuals who provide Personal Data to our organization.
          </p>

          <p className='global-content-style'>
            This Statement outlines our methods for gathering, maintaining, utilizing, and sharing your Personal Data in relation to our vehicle rental operations. Personal Data encompasses information about individuals that enables identification or connects to identified persons.
          </p>

          <p className='global-content-style'>
            Website usage at <Link className='anchor-inside-para' href={'https://zmrentals.co.nz/'}>zmrentals.co.nz</Link> constitutes agreement with this Statement's provisions.
          </p>

          <div className='privacy-policy-list-container'>
            <h2 className='global-heading-style'>Personal Information Gathering and Application</h2>
            <p className='global-content-style'>We gather the following categories of personal data from our customers:</p>
            <ul>
              <li className='global-content-style'>
                <strong>Contact Details:</strong> including full name, email address, mailing address, and phone number
              </li>
              <li className='global-content-style'>
                <strong>Payment Information:</strong> such as credit card details and billing address
              </li>
              <li className='global-content-style'>
                <strong>Driver’s License Data:</strong> including your license number and a copy of your license
              </li>
              <li className='global-content-style'>
                <strong>Unique Identifiers:</strong> such as usernames, account numbers, and passwords
              </li>
              <li className='global-content-style'>
                <strong>Preference Details:</strong> including product wish lists, purchase history, and marketing preferences
              </li>
              <li className='global-content-style'>
                <strong>Demographic Data:</strong> such as age, education level, gender, interests, and postal/zip code
              </li>
            </ul>

            <p className='global-content-style'>
                Like most digital platforms, we automatically capture technical information about your computing device, including IP addresses, browser specifications, referral and exit page data, and operating system details.
            </p>
            <p className='global-content-style'>
              For vehicle rental transactions, we additionally collect service-related information such as pickup and return locations, distance traveled during rental periods, and usage patterns. When traffic violations are issued to us as the registered vehicle owner, we compile the information contained within infringement notices.
            </p>
            <p className='global-content-style'>
              Photography competition participants provide submission-related data, including photographs, captions, and contact information such as names and email addresses.
            </p>
            <p className='global-content-style'>
              Personal Data provision may be mandatory due to legal requirements, voluntary in nature, or essential for contractual arrangements with our organization. Failure to provide the requested 
            </p>
            <p className='global-content-style'>
                Personal Data may result in our inability to deliver relevant services. Specifically, vehicle rental services cannot be provided without the essential information required for service delivery.
            </p>
            <p className='global-content-style'>
                Customers possessing New Zealand and Australian licenses undergo electronic identity verification procedures. This process utilizes a secure third-party verification platform called APLYiD. APLYiD gathers and supplies us with the information necessary to assess customer rental eligibility. APLYiD's Privacy Statement is accessible on their website at aplyid.com.
            </p>

          </div>

          <h2 className='global-heading-style'>Information Gathering Methods</h2>
          <p className='global-content-style'>
            Personal Data collection occurs when you supply information directly (account registration, inquiries, quotation requests, bookings through our website, mobile application, email, telephone, or physical locations). We also gather Personal Data through service usage and website interaction. Third-party sources may provide Personal Data when you authorize such contact, or as permitted under the New Zealand Privacy Act 2020 provisions.
          </p>
          <p className='global-content-style'>
            Website access from outside New Zealand constitutes agreement that any provided Personal Data falls under this Statement and the Privacy Act jurisdiction.
          </p>
          <p className='global-content-style'>
            Social media platform integration, including Instagram and Facebook, may occur through social media buttons linking to our website. Third-party service usage remains entirely voluntary. We may utilize any publicly available information from such platforms for business purposes.
          </p>
          <p className='global-content-style'>
            Third-party payment service providers may be necessary for service delivery.
          </p>
          <p className='global-content-style'>
              All third-party services operate under their respective privacy policies and practices, for which we bear no responsibility. Individuals preferring not to share Personal Data with third parties or make information publicly available should avoid using particular services.
          </p>



          <h2 className='global-heading-style'>Tracking Technologies and Cookies</h2>
          <p className='global-content-style'>
            Website cookies may be employed on our platform. Cookies are small data files stored on devices with web browsers (computers, tablets) containing information about devices, IP addresses, sessions, and online activity from device users. Most browsers provide options to disable or reject cookies. Cookie disabling or rejection may limit website functionality or increase loading times.
          </p>
          <p className='global-content-style'>
            Third-party advertising network partnerships enable advertising display on our website or advertisement management on external platforms. Network partners utilize cookies and web beacons to collect non-personally identifiable activity information across websites for targeted advertising based on interests. Individuals preferring to opt out of targeted advertising information usage may do so by clicking here: <Link href={'http://preferences-mgr.trustarc.com/'} target='_blank' className='anchor-inside-para'> http://preferences-mgr.trustarc.com/. </Link> Please note this does not eliminate all advertising; generic advertisements will continue. EU residents receive targeted advertising only after providing consent for customized online advertising.
          </p>
          <p className='global-content-style'>
            Additional cookie usage may occur as specified in our cookie policy sections.
          </p>


          <div className='personal-info-contianer'>
            <h2 className='global-heading-style'>Personal Information Collection, Usage, and Disclosure Purposes</h2>
            <p className='global-content-style'>Personal Data collection, usage, and disclosure occur only when a legal basis exists. We process Personal Data under these circumstances:</p>
            <p className='global-content-style' style={{fontWeight: '700'}}>{`a) Contract Performance Necessity for rental vehicle services or preliminary contractual steps, including:`}</p>

            <ul>
              <li className='global-content-style'>Identity verification and rental eligibility assessment</li>
              <li className='global-content-style'>Payment processing and financial transaction management</li>
              <li className='global-content-style'>Vehicle reservation and booking administration</li>
              <li className='global-content-style'>Service delivery and customer support provision</li>
              <li className='global-content-style'>Account creation and maintenance</li>
              <li className='global-content-style'>Communication regarding reservations and services</li>
            </ul>

             <p className='global-content-style' style={{fontWeight: '700'}}>{`b) Consent Provision in accordance with applicable law, or when consent is not legally required, for purposes including:`}</p>

             <ul>
              <li className='global-content-style'>Marketing communication and promotional material distribution</li>
              <li className='global-content-style'>Newsletter subscription services</li>
              <li className='global-content-style'>Research survey participation invitations</li>
              <li className='global-content-style'>Customer experience enhancement initiatives</li>
              <li className='global-content-style'>Product and service development feedback collection</li>
            </ul>

            <p className='global-content-style' style={{fontWeight: '700'}}>{`c) Legitimate Interest Purposes, including:`}</p>

             <ul>
              <li className='global-content-style'>Business operation and administration</li>
              <li className='global-content-style'>Service quality improvement and optimization</li>
              <li className='global-content-style'>Security and fraud prevention measures</li>
              <li className='global-content-style'>Legal compliance and dispute resolution</li>
              <li className='global-content-style'>Business analysis and strategic planning</li>
            </ul>

            <p className='global-content-style'>
              Additional Statement sections detail specific information collection, usage, and disclosure situations.
            </p>

            <p className='global-content-style'>Personal Data collection, usage, and disclosure also occur to fulfill legal obligations.</p>
            <p className='global-content-style'>Personal Data may be utilized and disclosed for stated purposes, under Privacy Act authorized circumstances, or with your consent.</p>
          
          </div>

          <h2 className='global-heading-style'>Communication Preferences and Opt-Out Options</h2>
          <p className='global-content-style'>Newsletter and marketing material provision, plus research survey invitations, occur only with your consent. We may contact you to confirm the appropriateness of your preference.</p>
          <p className='global-content-style'>Newsletter, marketing email, or research request cessation is available through unsubscribe instructions in emails or by contacting us at <Link href={'mailto:info@zmrentals.co.nz'} className='anchor-inside-para '>info@zmrentals.co.nz.</Link> </p>
      
      
          <h2 className='global-heading-style'>Third-Party Information Sources</h2>
          <p className='global-content-style'>Please refrain from providing Personal Data about others without obtaining individual consent. Providing third-party Personal Data constitutes a warranty that you are authorized to do so and have ensured individual awareness of this Statement's contents. Third-party Personal Data, or information others provide about you, will be used only for the specific provision reason.</p>
      
          <h2 className='global-heading-style'>Information Sharing Practices</h2>
          <p className='global-content-style' style={{fontWeight: '700'}}>Personal Data disclosure may occur to anyone you authorize for stated Statement purposes.</p>
          <p className='global-content-style'>Third-party Personal Data sharing occurs only as described in this Statement. We do not sell Personal Data to external parties. Personal Data sharing with service-providing companies includes credit card and payment processors, advertising network providers, and customer service organizations. Business and marketing adviser sharing enables research, analysis, and consultation services. Third-party Personal Data sharing occurs solely for service provision to us, without permitting independent usage or disclosure.</p>
      
          <p className='global-content-style'>Personal Data disclosure may occur to:</p>


          <ul className='privacy-list'>
            <li className='global-content-style'>Legal authorities, when required by law or court order</li>
            <li className='global-content-style'>Protection of company rights, property, or safety, plus customer and public protection</li>
            <li className='global-content-style'>Business transaction contexts, including mergers, acquisitions, or asset sales</li>
          </ul>

          <p className='global-content-style'>Merger, acquisition, or asset sale involvement will result in email notification and prominent website notices regarding ownership changes, Personal Data usage modifications, and available choices.</p>
      

          <h2 className='global-heading-style'>Security Measures</h2>
          <p className='global-content-style'>Personal information security holds significant importance. Privacy Act requirements mandate reasonable Personal Information security protection steps.</p>
          <p className='global-content-style'>Personnel must respect Personal Information confidentiality and individual privacy, with all staff aware of Privacy Act obligations.</p>
          <p className='global-content-style'>Sensitive information entry (credit card numbers) on order forms utilizes secure socket layer (SSL) encryption technology. Account password encryption occurs during registration processes.</p>
          <p className='global-content-style'>Industry-standard practices protect submitted personal information during transmission and after receipt. However, no internet transmission method or electronic storage system provides 100% security; therefore, absolute security cannot be guaranteed.</p>

          <h2 className='global-heading-style'>Personal Information Management</h2>
          <p className='global-content-style' style={{fontWeight: '700'}}>Personal Information collection results in our data custody.</p>
          <p className='global-content-style'>Website or service usage from outside New Zealand involves Personal Information transmission to New Zealand, where our offices are located. Personal Information transfer to third-party service providers (technology providers, business and marketing services, software tools) occurs for service performance, information processing, or storage on our behalf. These third parties may be offshore, including Australia and the United States. Some third-party service provider countries may lack comprehensive privacy laws compared to your residence country, and for EU residents, may lack European Commission adequacy decisions. Third parties are not authorized to use such information for independent purposes.</p>
          <p className='global-content-style'>Information retention occurs for active account duration or service provision needs (including newsletter, marketing email, and research request subscriptions), plus legal obligation fulfillment, including service-related obligation management. When Personal Information is no longer required for Privacy Act permitted purposes, reasonable deletion steps will be taken.</p>
          <p className='global-content-style'>Account cancellation, service cessation requests, or Personal Information consent withdrawal should be directed to <Link href={'mailto: info@zmrentals.co.nz'} className='anchor-inside-para'>info@zmrentals.co.nz.</Link> Information retention and usage in such cases will be limited to legal compliance, dispute resolution, and agreement enforcement requirements.</p>
          <p className='global-content-style' style={{fontWeight: '700'}}>Website security questions may be directed to <Link href={'mailto:info@zmrentals.co.nz'} className='anchor-inside-para'> info@zmrentals.co.nz.</Link></p>


          <h2 className='global-heading-style'>Additional Policy Provisions</h2>
          <p className='global-content-style' >Website Widgets are interactive mini-programs providing specific third-party company services, such as photograph competition displays and blog post commenting or sharing functionality. Personal Information, including names and email addresses, may be collected through Widgets.</p>
          <p className='global-content-style'>Widget cookies may be established for proper functionality. Widget information collection follows the creating company's privacy policy governance.</p>
          <p className='global-content-style'>Site login may utilize sign-in services, including Facebook Connect or Open ID providers. These services authenticate identity and offer options to share personal information such as names and email addresses, for signup form pre-population. Services like Facebook Connect provide options to post website activity information to profile pages for network sharing.</p>
          <p className='global-content-style'>Website blogs or community forums are publicly accessible. Information posted in such areas becomes public, enabling collection and usage for any purpose, including disclosure to any person. Information provided in these areas may be read, collected, and used by anyone accessing them.</p>
          <p className='global-content-style'>Website commenting functionality requires a name and the residence country provision for comment submission. Comments using this functionality may be displayed in full or partially on our website, together with the provided names and residence countries.</p>
      
          <h2 className='global-heading-style'>Access, Correction, and Update Procedures</h2>
          <p className='global-content-style' style={{fontWeight: '700'}}>Account information correction and preference changes are available through account login.</p>
          <p className='global-content-style'>Newsletter, marketing email, and research request unsubscription is available anytime through email footer unsubscribe links or by contacting <Link href={'mailto:info@zmrentals.co.nz'} className='anchor-inside-para'> info@zmrentals.co.nz.</Link> </p>
          <p className='global-content-style'>Personal Information access and correction requests are available if the information appears incorrect. Subject to Privacy Act exceptions, Personal Information access or correction requests may be submitted by contacting us at:</p>

          <span style={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', width: '100%', gap: '5px'}}>
            
            <p className='global-content-style'>ZM Rentals</p>
            <p className='global-content-style'>165 Beach Road, Auckland City,</p>
            <p className='global-content-style'>Auckland, 1010</p>
            <p className='global-content-style'>Email: <Link href={'mailto:info@zmrentals.co.nz'} className='anchor-inside-para'> info@zmrentals.co.nz.</Link></p>
            <p className='global-content-style'>+64221708848</p>
          </span>

          <p className='global-content-style'>Contact requires identity verification and specific Personal Information access requirements.</p>
          <p className='global-content-style'>Disputes arising between parties that cannot be resolved may be directed to the Office of the Privacy Commissioner at <Link target='_blank' href={'https://www.privacy.org.nz/.'} className='anchor-inside-para'> https://www.privacy.org.nz/.</Link></p>
          <p className='global-content-style'>EU residents under GDPR jurisdiction possess rights to processing restriction, processing objection, and data portability as GDPR specified by GDPR. Supervisory authority complaint lodging is also available.</p>
          

          <h2 className='global-heading-style'>Change Notifications</h2>
          <p className='global-content-style'>Statement updates may occur reflecting information practice changes. Material changes will result in email notification (sent to account-specified email addresses) or website notices prior to effectiveness. Regular page review is encouraged for current privacy practice information.</p>


          <h1 className='section-main-heading'>Cookie Statement</h1>
          <p className='global-content-style'>Cookies are text files containing small amounts of information downloaded to devices during website visits. Cookies transmit back to originating websites on subsequent visits, or to other websites recognizing particular cookies. Cookies provide utility by enabling website device recognition and enhanced website experiences.</p>
          <p className='global-content-style'>Cookie functions include efficient page navigation, preference retention, and general user experience improvement. They also help ensure online advertisement relevance to interests. Cookies themselves do not identify individual users, only computers or mobile devices through randomly generated identifying tags.</p>


        <h2 className='global-heading-style'>Cookie and Technology Usage</h2>
        <p className='global-content-style'>Both session cookies (expiring upon web browser closure) and persistent cookies (remaining on devices for set periods or until deletion) are utilized. The following cookie types serve specified purposes:</p>

        <h2 className='global-heading-style'>Essential Operational Cookies</h2>
        <p className='global-content-style'>These cookies are fundamental for website navigation and feature usage, including profile access. Without these cookies, requested services such as vehicle reservation or payment processing cannot be provided.</p>

        <h2 className='global-heading-style'>Performance and Analytics Cookies</h2>
        <p className='global-content-style'>These cookies gather anonymous information about visited pages and collect visitor website usage information, including frequently visited pages and web page error messages. These cookies do not collect visitor-identifying information. All collected information is aggregated and anonymous, used solely for website functionality improvement.</p>
        <p className='global-content-style'>ZM Rentals utilizes this cookie category for:</p>

        <ul className='privacy-list'>
          <li className='global-content-style'>Website performance monitoring and optimization</li>
          <li className='global-content-style'>User behavior analysis and pattern identification</li>
          <li className='global-content-style'>Error tracking and resolution</li>
          <li className='global-content-style'>Content effectiveness measurement</li>
          <li className='global-content-style'>Technical issue identification and resolution</li>
        </ul>

        <h2 className='global-heading-style'>Functional Cookies</h2>
        <p className='global-content-style'>These cookies remember choices made on <Link href={'https://zmrentals.co.nz/'} className='anchor-inside-para'> zmrentals.co.nz</Link> for experience enhancement. They enable website recognition of choices, including usernames, languages, or travel preferences, providing enhanced, personalized features.</p>
        <p style={{fontWeight: '700'}} className='global-content-style'>Strictly Necessary, Performance, and Functionality Categories</p>
        <p className='global-content-style'>These three cookie categories are essential for maintaining zmrentals.co.nz’s effectiveness, usability, and seamless experience provision. Independent disabling options are not provided; website and online service usage constitute agreement for these cookie types on your browser.</p>


        <h2 className='global-heading-style'>Targeting and Advertising Cookies</h2>
        <p className='global-content-style'>These cookies utilize <Link href={'https://zmrentals.co.nz/'} className='anchor-inside-para'> zmrentals.co.nz</Link> browsing information to enhance advertising relevance to travel needs. They deliver targeted advertisements and limit advertisement frequency while measuring digital advertising campaign effectiveness. Third-party advertising networks place them on our behalf with the Company's permission. They remember website visits and share this information with other organizations, including media owners.</p>


        <h2 className='global-heading-style'>Cookie Management and Opt-Out Procedures</h2>
        <p className='global-content-style'>Cookie restriction, blocking, or deletion from <Link href={'https://zmrentals.co.nz/'} className='anchor-inside-para'> zmrentals.co.nz</Link> is achievable through browser settings. Full cookie management details for different web browser types are available at <Link target='_blank' href={'https://www.aboutcookies.org/'} className='anchor-inside-para'>www.aboutcookies.org.</Link></p>
        <p className='global-content-style'>Choosing not to allow <Link href={'https://zmrentals.co.nz/'} className='anchor-inside-para'> zmrentals.co.nz</Link> as a "trusted site" will prevent website usage; call center contact will be necessary for reservation proceedings.</p>
      
      
        <h2 className='global-heading-style'></h2>
        <p className='global-content-style'></p>
      
      
      </div>
    </div>
  )
}

export default PrivacyAndPolicy