export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: "routing" | "security" | "wireless" | "datacenter" | "troubleshoot";
  articleCount: number;
};

export type Author = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  categoryId: string;
  authorId: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  featured: boolean;
  views: number;
};

const categoryCovers: Record<string, { coverImage: string; coverImageAlt: string }> = {
  "cat-routing": {
    coverImage: "/images/covers/routing.svg",
    coverImageAlt: "Network routing topology — nodes connected to core router",
  },
  "cat-security": {
    coverImage: "/images/covers/security.svg",
    coverImageAlt: "Network security shield protecting infrastructure",
  },
  "cat-wireless": {
    coverImage: "/images/covers/wireless.svg",
    coverImageAlt: "Wireless access point with signal coverage rings",
  },
  "cat-datacenter": {
    coverImage: "/images/covers/datacenter.svg",
    coverImageAlt: "Data center server rack with network connections",
  },
  "cat-troubleshoot": {
    coverImage: "/images/covers/troubleshoot.svg",
    coverImageAlt: "Network troubleshooting terminal with diagnostic commands",
  },
};

export function getArticleCover(article: Article) {
  const fallback = categoryCovers[article.categoryId] ?? categoryCovers["cat-routing"];
  return {
    coverImage: article.coverImage ?? fallback.coverImage,
    coverImageAlt: article.coverImageAlt ?? fallback.coverImageAlt,
  };
}

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const categories: Category[] = [
  {
    id: "cat-routing",
    name: "Routing & Switching",
    slug: "routing-switching",
    description: "OSPF, BGP, VLAN, STP และการออกแบบ Layer 2/3",
    icon: "routing",
    articleCount: 4,
  },
  {
    id: "cat-security",
    name: "Network Security",
    slug: "network-security",
    description: "Firewall, VPN, Zero Trust และการป้องกันภัยคุกคาม",
    icon: "security",
    articleCount: 3,
  },
  {
    id: "cat-wireless",
    name: "Wireless & Wi-Fi",
    slug: "wireless-wifi",
    description: "802.11, Site Survey, Controller และ Roaming",
    icon: "wireless",
    articleCount: 2,
  },
  {
    id: "cat-datacenter",
    name: "Data Center",
    slug: "data-center",
    description: "Spine-Leaf, VXLAN, Load Balancer และ High Availability",
    icon: "datacenter",
    articleCount: 2,
  },
  {
    id: "cat-troubleshoot",
    name: "Troubleshooting",
    slug: "troubleshooting",
    description: "Debug, Packet Capture, Log Analysis และ Best Practices",
    icon: "troubleshoot",
    articleCount: 3,
  },
];

export const authors: Author[] = [
  {
    id: "auth-1",
    name: "สมชาย วงศ์เครือข่าย",
    role: "Senior Network Engineer",
    avatar: "SC",
  },
  {
    id: "auth-2",
    name: "พิมพ์ใจ รักษ์ระบบ",
    role: "Security Specialist",
    avatar: "PR",
  },
  {
    id: "auth-3",
    name: "วิชัย โครงสร้าง",
    role: "Data Center Architect",
    avatar: "WC",
  },
  {
    id: "auth-4",
    name: "นภา สัญญาณ",
    role: "Wireless Engineer",
    avatar: "NS",
  },
];

export const articles: Article[] = [
  {
    id: "art-1",
    title: "OSPF Area Design สำหรับองค์กรขนาดกลาง",
    slug: "ospf-area-design-enterprise",
    excerpt:
      "แนวทางการออกแบบ OSPF Area ให้ scalable รองรับการขยายสาขาและลด LSA flooding",
    content: `## บทนำ
OSPF (Open Shortest Path First) เป็น routing protocol ที่นิยมใช้ในองค์กรขนาดกลางถึงใหญ่ การออกแบบ Area ที่ดีจะช่วยลด overhead และเพิ่มความเสถียรของ network

## หลักการออกแบบ Area
1. **Area 0 (Backbone)** — ต้องเชื่อมต่อทุก Area อื่นผ่าน ABR
2. **Stub Area** — ลด external routes โดยใช้ default route
3. **NSSA** — รองรับ ASBR ภายใน area โดยไม่ inject external routes ไป area อื่น

![OSPF Multi-Area Topology — Area 0 backbone เชื่อม Area 1 และ Area 2 ผ่าน ABR](/images/diagrams/ospf-areas.svg)

## ตัวอย่าง Topology
\`\`\`
[Branch-A] --- [ABR-1] --- Area 0 --- [ABR-2] --- [Branch-B]
                  |
              [Area 1]
                  |
            [Remote Sites]
\`\`\`

## Best Practices
- จำกัดจำนวน router ต่อ area ไม่เกิน 50 ตัว (แนะนำ)
- ใช้ summarization ที่ ABR เพื่อลด routing table size
- ตั้ง cost ให้สอดคล้องกับ bandwidth จริง
- Monitor SPF calculation time ด้วย \`show ip ospf statistics\`

## สรุป
การวางแผน Area ตั้งแต่ต้นจะช่วยลด technical debt เมื่อ network ขยายตัว`,
    categoryId: "cat-routing",
    authorId: "auth-1",
    tags: ["OSPF", "Routing", "Design"],
    readTime: 8,
    publishedAt: "2025-11-15",
    featured: true,
    views: 1240,
  },
  {
    id: "art-2",
    title: "BGP Route Filtering และ Policy Control",
    slug: "bgp-route-filtering-policy",
    excerpt:
      "เทคนิคการ filter BGP routes ด้วย prefix-list, route-map และ AS-path filter",
    content: `## ทำไมต้อง Filter BGP Routes?
เมื่อเชื่อมต่อกับ ISP หรือ partner การรับ routes ทั้งหมดโดยไม่ filter อาจทำให้ routing table บวมและเกิด routing loop

## เครื่องมือหลัก
- **Prefix-list** — กำหนด network ที่อนุญาต/ปฏิเสธ
- **Route-map** — ใช้ match/set เพื่อ policy control
- **AS-path access-list** — filter ตาม AS path

## ตัวอย่าง Route-map
\`\`\`cisco
route-map ISP-IN permit 10
 match ip address prefix-list ALLOWED-PREFIXES
 set local-preference 200

route-map ISP-IN deny 100
\`\`\`

## Tips
- ใช้ \`soft-reconfiguration inbound\` สำหรับ debugging
- Document ทุก policy change
- Test ใน lab ก่อน apply production`,
    categoryId: "cat-routing",
    authorId: "auth-1",
    tags: ["BGP", "Policy", "ISP"],
    readTime: 10,
    publishedAt: "2025-10-28",
    featured: true,
    views: 980,
  },
  {
    id: "art-3",
    title: "VLAN Trunking และ Inter-VLAN Routing",
    slug: "vlan-trunking-inter-vlan-routing",
    excerpt:
      "802.1Q tagging, native VLAN security และการ routing ระหว่าง VLAN บน L3 switch",
    content: `## VLAN Trunking Basics
Trunk port ใช้ 802.1Q tagging เพื่อส่ง traffic หลาย VLAN ผ่าน link เดียว

## Native VLAN
- ต้องตรงกันทั้งสองฝั่ง
- เปลี่ยนจาก VLAN 1 เพื่อความปลอดภัย
- ระวัง VLAN hopping attack

## Inter-VLAN Routing
ใช้ SVI (Switch Virtual Interface) บน L3 switch:
\`\`\`cisco
interface Vlan10
 ip address 192.168.10.1 255.255.255.0
\`\`\`

## สรุป
ออกแบบ VLAN ให้สอดคล้องกับ business unit และ security zone`,
    categoryId: "cat-routing",
    authorId: "auth-1",
    tags: ["VLAN", "802.1Q", "Switching"],
    readTime: 6,
    publishedAt: "2025-09-12",
    featured: false,
    views: 756,
  },
  {
    id: "art-4",
    title: "Spanning Tree Protocol: RSTP vs MST",
    slug: "stp-rstp-mst-comparison",
    excerpt:
      "เปรียบเทียบ STP, RSTP และ MST พร้อมแนวทางเลือกใช้ใน network จริง",
    content: `## STP Family Overview
- **STP (802.1D)** — convergence ช้า (~30-50 วินาที)
- **RSTP (802.1w)** — convergence เร็ว (~1-3 วินาที)
- **MST (802.1s)** — หลาย instance, ลด resource

## เมื่อไหร่ใช้อะไร
| Protocol | Use Case |
|----------|----------|
| RSTP | Network ทั่วไป, ต้องการ convergence เร็ว |
| MST | Network ใหญ่, ต้องการ load balance หลาย VLAN |

## Best Practice
- กำหนด root bridge อย่างชัดเจน
- ใช้ portfast กับ end-device ports เท่านั้น
- Enable BPDU guard บน access ports`,
    categoryId: "cat-routing",
    authorId: "auth-1",
    tags: ["STP", "RSTP", "MST"],
    readTime: 7,
    publishedAt: "2025-08-20",
    featured: false,
    views: 612,
  },
  {
    id: "art-5",
    title: "Zero Trust Network Access (ZTNA) 101",
    slug: "zero-trust-network-access-101",
    excerpt:
      "แนวคิด Zero Trust, การ verify ทุก request และการ deploy ZTNA ในองค์กร",
    content: `## Zero Trust คืออะไร?
"Never trust, always verify" — ไม่เชื่อถือ network ภายในโดยอัตโนมัติ ทุก access ต้อง authenticate และ authorize

![Zero Trust Architecture — verify ทุก request ก่อนเข้าถึง application](/images/diagrams/zero-trust.svg)

## หลักการ 3 ข้อ
1. **Verify explicitly** — ใช้ identity + device posture
2. **Least privilege access** — ให้สิทธิ์เท่าที่จำเป็น
3. **Assume breach** — ออกแบบให้จำกัด blast radius

## ZTNA vs VPN แบบเดิม
- VPN: เข้า network แล้วเข้าถึงได้กว้าง
- ZTNA: เข้าถึงเฉพาะ application ที่อนุญาต

## Implementation Steps
1. Inventory applications และ users
2. Define policy per application
3. Deploy identity provider integration
4. Monitor และ refine policies`,
    categoryId: "cat-security",
    authorId: "auth-2",
    tags: ["Zero Trust", "Security", "ZTNA"],
    readTime: 9,
    publishedAt: "2025-11-01",
    featured: true,
    views: 1580,
  },
  {
    id: "art-6",
    title: "Site-to-Site IPsec VPN Configuration Guide",
    slug: "site-to-site-ipsec-vpn-guide",
    excerpt:
      "ขั้นตอนตั้งค่า IPsec VPN ระหว่างสาขา Phase 1/2, IKEv2 และ troubleshooting",
    content: `## IPsec VPN Overview
Site-to-Site VPN เชื่อมต่อ network สอง site ผ่าน internet อย่างปลอดภัย

![Site-to-Site IPsec VPN — encrypted tunnel ระหว่าง Site A และ Site B](/images/diagrams/vpn-tunnel.svg)

## Phase 1 (IKE)
- Authentication: Pre-shared key หรือ Certificate
- Encryption: AES-256
- Hash: SHA-256
- DH Group: 14 หรือสูงกว่า

## Phase 2 (IPsec)
- Protocol: ESP
- Mode: Tunnel
- PFS: Enable

## Troubleshooting Checklist
1. Ping ระหว่าง public IP ได้หรือไม่
2. Phase 1 up หรือยัง?
3. Interesting traffic ถูกต้องหรือไม่
4. NAT-T จำเป็นหรือไม่ (port 4500)`,
    categoryId: "cat-security",
    authorId: "auth-2",
    tags: ["VPN", "IPsec", "Security"],
    readTime: 12,
    publishedAt: "2025-10-05",
    featured: false,
    views: 890,
  },
  {
    id: "art-7",
    title: "Firewall Rule Design Best Practices",
    slug: "firewall-rule-design-best-practices",
    excerpt:
      "หลักการออกแบบ firewall policy, rule ordering และการ audit rules เป็นระยะ",
    content: `## Rule Ordering Matters
Firewall process rules จากบนลงล่าง — rule แรกที่ match จะถูก apply

## Design Principles
- **Deny by default** — อนุญาตเฉพาะที่จำเป็น
- **Specific before general** — ใส่ rule ละเอียดก่อน broad rule
- **Document every rule** — ระบุ owner, purpose, expiry date

## Common Mistakes
- Any-any rules ที่ลืมลบ
- Overlapping rules ทำให้ debug ยาก
- ไม่ review rules เป็นระยะ

## Audit Template
| Rule # | Source | Dest | Port | Purpose | Owner | Review Date |`,
    categoryId: "cat-security",
    authorId: "auth-2",
    tags: ["Firewall", "Policy", "Security"],
    readTime: 5,
    publishedAt: "2025-07-18",
    featured: false,
    views: 534,
  },
  {
    id: "art-8",
    title: "Wi-Fi 6E Site Survey Checklist",
    slug: "wifi-6e-site-survey-checklist",
    excerpt:
      "ขั้นตอนทำ site survey สำหรับ Wi-Fi 6E รวม channel planning และ AP placement",
    content: `## Wi-Fi 6E Advantages
- ใช้ 6 GHz band (1200 MHz spectrum)
- ลด congestion จาก legacy devices
- รองรับ wider channels (80/160 MHz)

## Site Survey Steps
1. **Pre-survey** — รวบรวม floor plan, user density, application requirements
2. **Passive survey** — วัด RF environment ปัจจุบัน
3. **Predictive design** — วาง AP ด้วย software (Ekahau, Hamina)
4. **Active survey** — ทดสоб coverage และ throughput จริง
5. **Post-deployment validation** — verify SLA

![Wi-Fi Site Survey Coverage Heatmap — AP placement และ signal overlap](/images/diagrams/wifi-coverage.svg)

## Channel Planning
- 6 GHz: ใช้ 80 MHz channels เป็นหลัก
- หลีกเลี่ยง co-channel interference
- ตั้ง TX power ให้เหมาะสม ไม่สูงเกินไป`,
    categoryId: "cat-wireless",
    authorId: "auth-4",
    tags: ["Wi-Fi 6E", "Site Survey", "Wireless"],
    readTime: 11,
    publishedAt: "2025-10-20",
    featured: true,
    views: 720,
  },
  {
    id: "art-9",
    title: "802.11 Roaming: Fast Transition (802.11r/k/v)",
    slug: "80211-roaming-fast-transition",
    excerpt:
      "อธิบาย 802.11r, 802.11k, 802.11v และการตั้งค่า seamless roaming",
    content: `## Roaming Challenge
เมื่อ client เคลื่อนที่ AP ต้อง handoff โดยไม่ drop connection

## Standards
- **802.11k** — Neighbor Report, ช่วย client รู้ AP ใกล้เคียง
- **802.11v** — BSS Transition Management, ช่วย steer client
- **802.11r** — Fast BSS Transition, ลด handoff time

## Configuration Tips
- Enable 802.11r/k/v บน WLAN profile
- ใช้ same SSID และ security ทุก AP
- Test ด้วย VoIP call ขณะเดิน`,
    categoryId: "cat-wireless",
    authorId: "auth-4",
    tags: ["802.11r", "Roaming", "Wireless"],
    readTime: 6,
    publishedAt: "2025-09-05",
    featured: false,
    views: 445,
  },
  {
    id: "art-10",
    title: "Spine-Leaf Architecture ใน Data Center",
    slug: "spine-leaf-data-center-architecture",
    excerpt:
      "ออกแบบ Spine-Leaf topology, ECMP routing และ scaling ใน modern data center",
    content: `## ทำไม Spine-Leaf?
Traditional 3-tier มี oversubscription และ STP limitations — Spine-Leaf แก้ด้วย non-blocking fabric

## Components
- **Leaf switches** — ต่อ servers และเป็น default gateway (Anycast GW)
- **Spine switches** — core ของ fabric, ทุก leaf ต่อทุก spine
- **ECMP** — load balance traffic หลาย path

![Spine-Leaf Fabric — full mesh ระหว่าง leaf และ spine switches](/images/diagrams/spine-leaf.svg)

## Scaling Formula
- Links per leaf = number of spines
- Total bandwidth = leaf ports × spine count × link speed

## Design Consideration
- ใช้ /31 หรือ unnumbered สำหรับ point-to-point
- BGP เป็น underlay routing protocol มาตรฐาน`,
    categoryId: "cat-datacenter",
    authorId: "auth-3",
    tags: ["Spine-Leaf", "Data Center", "Architecture"],
    readTime: 10,
    publishedAt: "2025-11-10",
    featured: true,
    views: 1100,
  },
  {
    id: "art-11",
    title: "VXLAN EVPN สำหรับ Data Center Overlay",
    slug: "vxlan-evpn-data-center-overlay",
    excerpt:
      "พื้นฐาน VXLAN, EVPN control plane และการ deploy overlay network",
    content: `## VXLAN Overview
VXLAN encapsulate L2 frame ใน UDP (port 4789) ขยาย Layer 2 ข้าม Layer 3

## Key Concepts
- **VNI** — Virtual Network Identifier (เหมือน VLAN ID)
- **VTEP** — VXLAN Tunnel Endpoint
- **EVPN** — ใช้ BGP เป็น control plane แทน flood-and-learn

## Benefits
- 16M segments (vs 4K VLAN)
- Workload mobility
- Multi-tenancy

## Deployment
1. Configure underlay (BGP)
2. Enable EVPN on VTEPs
3. Create VNIs และ map กับ bridge domains`,
    categoryId: "cat-datacenter",
    authorId: "auth-3",
    tags: ["VXLAN", "EVPN", "Overlay"],
    readTime: 13,
    publishedAt: "2025-08-30",
    featured: false,
    views: 678,
  },
  {
    id: "art-12",
    title: "Network Troubleshooting Methodology",
    slug: "network-troubleshooting-methodology",
    excerpt:
      "ขั้นตอน debug แบบเป็นระบบ OSI layer approach และ documentation template",
    content: `## Systematic Approach
1. **Define the problem** — อาการ, scope, timeline
2. **Gather information** — logs, topology, recent changes
3. **Form hypothesis** — เรียงจาก likely to unlikely
4. **Test** — ทีละ hypothesis
5. **Implement fix** — และ verify
6. **Document** — บันทึก root cause และ prevention

![OSI Model Troubleshooting Layers — debug จาก L1 ขึ้นไป L7](/images/diagrams/osi-layers.svg)

## OSI Layer Checklist
| Layer | Tools |
|-------|-------|
| L1 | \`show interface\`, cable test |
| L2 | MAC table, STP status |
| L3 | \`ping\`, \`traceroute\`, routing table |
| L4 | \`telnet\`, port scan |
| L7 | Application logs, Wireshark |

## Golden Rule
เปลี่ยนทีละอย่าง — ถ้าเปลี่ยนหลายอย่างพร้อมกัน จะไม่รู้ว่าอะไร fix ปัญหา`,
    categoryId: "cat-troubleshoot",
    authorId: "auth-1",
    tags: ["Troubleshooting", "Methodology", "Debug"],
    readTime: 7,
    publishedAt: "2025-11-20",
    featured: true,
    views: 920,
  },
  {
    id: "art-13",
    title: "Wireshark สำหรับ Network Engineer",
    slug: "wireshark-for-network-engineers",
    excerpt:
      "Display filters ที่ใช้บ่อย, การ capture บน SPAN port และวิเคราะห์ TCP issues",
    content: `## Essential Display Filters
\`\`\`
tcp.flags.syn == 1 && tcp.flags.ack == 0    # SYN packets
tcp.analysis.retransmission                  # Retransmissions
dns.qry.name contains "example"              # DNS queries
http.response.code == 404                    # HTTP 404
\`\`\`

## Capture Tips
- Capture บน SPAN/mirror port
- ใช้ ring buffer ถ้า disk จำกัด
- Filter ตั้งแต่ capture ถ้ารู้ protocol

## TCP Analysis
- **Retransmission** — packet loss หรือ congestion
- **Duplicate ACK** — fast retransmit indicator
- **Zero Window** — receiver buffer full`,
    categoryId: "cat-troubleshoot",
    authorId: "auth-1",
    tags: ["Wireshark", "Packet Capture", "Debug"],
    readTime: 9,
    publishedAt: "2025-10-15",
    featured: false,
    views: 834,
  },
  {
    id: "art-14",
    title: "Common Network Incidents และ Root Cause",
    slug: "common-network-incidents-root-cause",
    excerpt:
      "สรุป incident ที่พบบ่อย: broadcast storm, flapping, MTU mismatch และวิธีป้องกัน",
    content: `## Top 5 Incidents

### 1. Broadcast Storm
- **สาเหตุ**: Loop ใน L2 network
- **แก้ไข**: Enable STP, BPDU guard
- **ป้องกัน**: Network segmentation

### 2. Interface Flapping
- **สาเหตุ**: สายเสีย, SFP มีปัญหา, duplex mismatch
- **แก้ไข**: เปลี่ยนสาย/SFP, ตั้ง speed/duplex

### 3. MTU Mismatch
- **สาเหตุ**: Path MTU ไม่เท่ากัน
- **แก้ไข**: Align MTU ทุก hop, ใช้ MSS clamping

### 4. DNS Failure
- **สาเหตุ**: DNS server down, wrong DNS config
- **แก้ไข**: Redundant DNS, monitor resolution time

### 5. Certificate Expiry
- **สาเหตุ**: SSL cert หมดอายุ
- **ป้องกัน**: Certificate monitoring alert`,
    categoryId: "cat-troubleshoot",
    authorId: "auth-2",
    tags: ["Incidents", "Root Cause", "Operations"],
    readTime: 8,
    publishedAt: "2025-09-22",
    featured: false,
    views: 567,
  },
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Knowledge base นี้เหมาะกับใคร?",
    answer:
      "เหมาะสำหรับ Network Engineer, System Admin และ IT ที่ต้องการแชร์และค้นหาความรู้ด้าน Network ภายในองค์กร",
  },
  {
    id: "faq-2",
    question: "สามารถเพิ่มบทความใหม่ได้อย่างไร?",
    answer:
      "ปัจจุบันใช้ Mock Data ในระบบ เมื่อเชื่อมต่อ backend จริง สมาชิกทีมสามารถ submit บทความผ่านหน้า Submit Article ได้",
  },
  {
    id: "faq-3",
    question: "เนื้อหาครอบคลุม vendor ไหนบ้าง?",
    answer:
      "เน้น concept และ best practices ที่ใช้ได้กับทุก vendor เช่น Cisco, Juniper, Fortinet, Aruba โดยตัวอย่าง config ใช้ Cisco-style syntax",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter((a) => a.categoryId === categoryId);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return articles
    .filter((a) => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return articles;
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export const stats = {
  totalArticles: articles.length,
  totalCategories: categories.length,
  totalAuthors: authors.length,
  totalViews: articles.reduce((sum, a) => sum + a.views, 0),
};
