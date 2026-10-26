/** Remove only REG-001's two uniquely identified additive regions for historical guards. */
export const originalHackathon = html => html
  .replace(/<section class="hx-section" id="registration-channels"[\s\S]*?<\/section>/, '')
  .replace(/<aside class="hx-card" data-reg001-support="card"[\s\S]*?<\/aside>/, '');
export const originalHackathonSource = source => source
  .replace('import RegistrationChannels from "../../components/hackathons/RegistrationChannels.astro";\n', '')
  .replace('import CommunitySupport from "../../components/hackathons/CommunitySupport.astro";\n', '')
  .replace('      <RegistrationChannels/>\n', '')
  .replace('        <CommunitySupport id="faq-community" variant="card"/>\n', '');
