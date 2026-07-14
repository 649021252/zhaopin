"use client";

import { useMemo, useRef, useState } from "react";

type Job = { id:number; title:string; company:string; city:string; salary:string; exp:string; education:string; tags:string[]; score:number; reason:string; source:string; time:string; color:string };

const jobs: Job[] = [
  {id:1,title:"AI 应用架构师",company:"杭州云启科技",city:"杭州",salary:"35-55K·15薪",exp:"10年以上",education:"本科",tags:["AI Agent","RAG","Java","平台架构"],score:96,reason:"平台架构与 AI 工程化经验高度匹配",source:"企业官网",time:"2小时前",color:"#1769e0"},
  {id:2,title:"大模型解决方案架构师",company:"星河智能",city:"上海",salary:"40-65K",exp:"8年以上",education:"本科",tags:["大模型","行业解决方案","MCP","微服务"],score:93,reason:"具备行业系统与大模型融合落地经验",source:"第三方平台",time:"今天",color:"#7558d8"},
  {id:3,title:"工业互联网技术专家",company:"数智水务集团",city:"杭州",salary:"30-50K·14薪",exp:"10年以上",education:"本科",tags:["工业互联网","数字孪生","物联网","技术管理"],score:89,reason:"智慧水利和工业协议能力形成差异化优势",source:"企业官网",time:"1天前",color:"#0d9b74"},
  {id:4,title:"高级 Java 架构师",company:"远航金融科技",city:"南京",salary:"32-48K",exp:"8年以上",education:"本科",tags:["Java","Spring Cloud","高并发","分布式"],score:86,reason:"18年研发经验覆盖核心技术要求",source:"第三方平台",time:"2天前",color:"#e07a28"},
  {id:5,title:"AI Agent 研发负责人",company:"灵犀未来",city:"北京",salary:"45-70K·16薪",exp:"8年以上",education:"本科",tags:["Agent","Tool Calling","多Agent","团队管理"],score:84,reason:"Agent 工程实践匹配，管理经历可进一步补充",source:"企业官网",time:"3天前",color:"#d4487c"},
];

const Icon = ({name,size=20}:{name:string,size?:number}) => {
  const paths:Record<string,React.ReactNode>={
    home:<><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5M9 21v-7h6v7"/></>,
    brief:<><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M9 12v2h6v-2"/></>,
    file:<><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    chart:<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    admin:<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    upload:<><path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M4 15v5h16v-5"/></>,
    spark:<><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"/></>,
    heart:<><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></>,
    link:<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    chevron:<path d="m9 18 6-6-6-6"/>,
    database:<><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>
};

const nav=[['home','智能推荐'],['brief','职位大厅'],['file','我的简历'],['chart','推荐报告'],['bell','消息中心'],['admin','管理控制台']];

export default function Home(){
  const [active,setActive]=useState('智能推荐'); const [query,setQuery]=useState(''); const [city,setCity]=useState('全部城市');
  const [saved,setSaved]=useState<number[]>([2]); const [uploaded,setUploaded]=useState(true); const [toast,setToast]=useState(''); const fileRef=useRef<HTMLInputElement>(null);
  const [syncing,setSyncing]=useState(false); const [tab,setTab]=useState('全部推荐');
  const filtered=useMemo(()=>jobs.filter(j=>(city==='全部城市'||j.city===city)&&(`${j.title}${j.company}${j.tags.join('')}`).toLowerCase().includes(query.toLowerCase())),[query,city]);
  const notify=(s:string)=>{setToast(s);setTimeout(()=>setToast(''),2300)};
  const toggleSave=(id:number)=>setSaved(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Icon name="spark" size={22}/></div><div><b>智聘</b><span>AI RECRUIT</span></div></div>
      <nav>{nav.map(([i,n])=><button key={n} className={active===n?'active':''} onClick={()=>setActive(n)}><Icon name={i}/><span>{n}</span>{n==='消息中心'&&<em>3</em>}</button>)}</nav>
      <div className="side-card"><Icon name="spark"/><b>AI 求职助手</b><p>每天自动分析新岗位，为你筛选更合适的机会</p><button onClick={()=>notify('AI 助手已为你刷新推荐')}>立即对话</button></div>
      <div className="user-mini"><div className="avatar">曹</div><div><b>曹国军</b><span>AI 应用架构师</span></div><span>•••</span></div>
    </aside>
    <main className="main">
      <header><div className="mobile-brand">智聘 AI</div><div className="header-search"><Icon name="search"/><input aria-label="全局搜索" placeholder="搜索职位、公司或技能" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-btn" aria-label="消息" onClick={()=>setActive('消息中心')}><Icon name="bell"/><i/></button><div className="header-user"><div className="avatar">曹</div><span>下午好，曹先生</span></div></header>
      {active==='智能推荐' && <Dashboard />}
      {active==='职位大厅' && <JobHall />}
      {active==='我的简历' && <Resume />}
      {active==='推荐报告' && <Report />}
      {active==='消息中心' && <Messages />}
      {active==='管理控制台' && <Admin />}
    </main>
    {toast&&<div className="toast"><Icon name="check"/>{toast}</div>}
  </div>;

  function Dashboard(){return <div className="page"><section className="welcome"><div><span className="eyebrow"><Icon name="spark" size={16}/>AI 每日推荐</span><h1>发现更适合你的职业机会</h1><p>基于你的 18 年架构经验与 AI 工程能力，今日为你精选 <b>12</b> 个高匹配岗位。</p></div><div className="welcome-art"><div className="orbit o1"/><div className="orbit o2"/><Icon name="brief" size={46}/><span className="bubble b1">96%</span><span className="bubble b2">AI 匹配</span></div></section>
    <section className="stats"><div><span className="stat-icon blue"><Icon name="brief"/></span><p>新增匹配职位<b>12</b><small>较昨日 +3</small></p></div><div><span className="stat-icon green"><Icon name="chart"/></span><p>平均匹配度<b>88%</b><small>行业前 8%</small></p></div><div><span className="stat-icon purple"><Icon name="admin"/></span><p>简历竞争力<b>92</b><small>表现优秀</small></p></div><div><span className="stat-icon orange"><Icon name="bell"/></span><p>招聘方活跃<b>8</b><small>近 24 小时</small></p></div></section>
    <section className="content-grid"><div className="feed"><div className="section-head"><div><h2>为你推荐</h2><p>AI 多维分析 · 每日 09:00 更新</p></div><button className="text-btn" onClick={()=>notify('推荐列表已刷新')}>换一批 ↻</button></div><div className="tabs">{['全部推荐','高匹配','最新发布','已收藏'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x}{x==='高匹配'&&<sup>5</sup>}</button>)}</div><div className="job-list">{(tab==='已收藏'?filtered.filter(x=>saved.includes(x.id)):filtered).slice(0,4).map(j=><JobCard j={j} key={j.id}/>)}</div><button className="more" onClick={()=>setActive('职位大厅')}>查看全部推荐职位 <Icon name="chevron" size={16}/></button></div>
    <aside className="right-col"><ResumeSummary/><SkillRadar/><div className="qr-card"><div className="fake-qr">▦</div><div><b>微信接收职位提醒</b><p>扫码进入小程序，新推荐实时送达</p></div></div></aside></section></div>}

  function JobHall(){return <div className="page"><PageTitle title="职位大厅" desc={`已收录 2,846 个有效岗位，数据更新于 10 分钟前`}/><div className="filter-bar"><div className="header-search"><Icon name="search"/><input placeholder="搜索职位、公司或技能" value={query} onChange={e=>setQuery(e.target.value)}/></div><select value={city} onChange={e=>setCity(e.target.value)}><option>全部城市</option><option>杭州</option><option>上海</option><option>北京</option><option>南京</option></select><select><option>薪资不限</option><option>30K-50K</option><option>50K以上</option></select><button className="primary" onClick={()=>notify(`找到 ${filtered.length} 个匹配职位`)}>筛选职位</button></div><div className="hall-layout"><div className="job-list large">{filtered.map(j=><JobCard j={j} key={j.id}/>)}</div><aside><div className="panel"><h3>热门技能</h3><div className="cloud">{['AI Agent','RAG','Java','平台架构','MCP','Spring Cloud','数字孪生','大模型'].map(x=><button onClick={()=>setQuery(x)} key={x}>{x}</button>)}</div></div><div className="panel source"><h3>数据来源</h3><p><i className="ok"/>企业官网 <b>1,532</b></p><p><i className="ok"/>合作招聘平台 <b>1,314</b></p><small>岗位经过去重、纠错和时效性校验</small></div></aside></div></div>}

  function Resume(){return <div className="page"><PageTitle title="我的简历" desc="管理求职信息，AI 将据此优化岗位匹配结果"/><div className="resume-layout"><div className="resume-doc"><div className="doc-head"><div><h2>曹国军</h2><p>专家级 AI 应用架构师 · 杭州</p></div><button onClick={()=>notify('已进入简历编辑模式')}>编辑简历</button></div><div className="doc-section"><h3>个人优势</h3><p>拥有18年软件研发及架构设计经验，长期深耕企业级平台、金融科技、物联网、工业互联网、智慧城市与智慧水利领域。具备大型系统平台化建设、高并发链路优化与 AI 工程化落地能力。</p></div><div className="doc-section"><h3>核心技能</h3><div className="skills">{['平台架构','Java后端','AI工程化','工业互联网','数字孪生','技术管理'].map(x=><span key={x}>{x}</span>)}</div></div><div className="doc-section"><h3>最近经历</h3><div className="timeline"><i/><div><b>技术负责人 / 架构师</b><span>某科技公司 · 2018 - 至今</span><p>负责企业级平台架构设计、核心研发及 AI 行业应用落地。</p></div></div></div></div><aside><ResumeSummary/><div className="panel upload-panel"><Icon name="upload" size={30}/><h3>更新简历</h3><p>支持 PDF、DOCX，最大 10MB</p><input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx" onChange={()=>{setUploaded(true);notify('简历上传成功，AI 正在重新分析')}}/><button className="primary" onClick={()=>fileRef.current?.click()}>选择文件</button></div></aside></div></div>}

  function Report(){return <div className="page"><PageTitle title="AI 推荐报告" desc="从能力、经验和求职偏好三个维度解释每一次推荐"/><div className="report-grid"><div className="score-card"><div className="ring"><b>92</b><span>竞争力得分</span></div><div><h2>你的职业竞争力表现优秀</h2><p>超越同类候选人 91%，建议重点投递 AI 应用架构与行业解决方案岗位。</p><div className="legend"><span><i className="c1"/>技能匹配 94</span><span><i className="c2"/>经验匹配 98</span><span><i className="c3"/>市场需求 85</span></div></div></div><SkillRadar/><div className="panel insight"><span className="eyebrow"><Icon name="spark" size={16}/>AI 洞察</span><h3>本周建议</h3><ul><li>强化简历中 AI Agent 项目的量化成果</li><li>补充团队规模与技术决策职责</li><li>优先关注杭州、上海的行业 AI 岗位</li></ul></div><div className="panel trend"><h3>近 7 日匹配趋势</h3><div className="bars">{[62,76,68,88,82,94,89].map((x,i)=><span key={i} style={{height:x+'%'}}><i>{x}</i></span>)}</div><div className="days">{['一','二','三','四','五','六','日'].map(x=><span key={x}>周{x}</span>)}</div></div></div></div>}

  function Messages(){return <div className="page"><PageTitle title="消息中心" desc="职位更新、投递进度与系统通知"/><div className="message-list">{[['高匹配岗位提醒','杭州云启科技发布了“AI 应用架构师”，与你的经历匹配度 96%。','刚刚','spark'],['职位状态更新','你收藏的“大模型解决方案架构师”仍在热招，招聘方今日活跃。','2小时前','brief'],['简历分析完成','新版简历解析完成，竞争力得分提升至 92 分。','昨天','file']].map((m,i)=><button onClick={()=>notify('消息已标记为已读')} key={m[0]}><span className={`msg-icon m${i}`}><Icon name={m[3]}/></span><div><b>{m[0]}</b><p>{m[1]}</p></div><time>{m[2]}</time>{i<2&&<i/>}</button>)}</div></div>}

  function Admin(){return <div className="page"><PageTitle title="管理控制台" desc="岗位数据、求职者与推荐任务统一管理"/><section className="stats admin-stats"><div><span className="stat-icon blue"><Icon name="database"/></span><p>有效职位<b>2,846</b><small>今日新增 126</small></p></div><div><span className="stat-icon green"><Icon name="admin"/></span><p>活跃用户<b>1,208</b><small>本周 +12.6%</small></p></div><div><span className="stat-icon purple"><Icon name="spark"/></span><p>推荐任务<b>18,492</b><small>成功率 99.2%</small></p></div></section><div className="admin-grid"><div className="panel"><div className="section-head"><div><h2>采集任务</h2><p>定时抓取、清洗、去重并更新岗位库</p></div><button className="primary" disabled={syncing} onClick={()=>{setSyncing(true);setTimeout(()=>{setSyncing(false);notify('采集任务执行完成：新增 38 条')},1600)}}>{syncing?'采集中…':'立即采集'}</button></div><table><thead><tr><th>数据源</th><th>状态</th><th>今日采集</th><th>有效率</th><th>最近执行</th></tr></thead><tbody>{[['企业官网集群','运行中','862','94.8%','10分钟前'],['合作招聘平台','运行中','1,204','91.2%','18分钟前'],['历史岗位校验','已完成','780','87.6%','1小时前']].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={c}>{i===1?<span className="status"><i/>{c}</span>:c}</td>)}</tr>)}</tbody></table></div><div className="panel pipeline"><h3>AI 推荐流水线</h3>{[['1','简历解析','提取技能、经历与求职偏好'],['2','混合召回','向量检索 + 关键词召回'],['3','大模型重排','语义匹配与岗位质量评估'],['4','结果解释','生成推荐理由与差距分析']].map((x,i)=><div key={x[0]}><span>{x[0]}</span><p><b>{x[1]}</b><small>{x[2]}</small></p>{i<3&&<i/>}</div>)}</div></div></div>}

  function JobCard({j}:{j:Job}){return <article className="job-card"><div className="company-logo" style={{background:j.color}}>{j.company.slice(0,1)}</div><div className="job-main"><div className="job-title"><h3>{j.title}</h3><strong>{j.salary}</strong></div><p className="company">{j.company}<span>·</span>{j.city}<span>·</span>{j.exp}<span>·</span>{j.education}</p><div className="tags">{j.tags.map(t=><span key={t}>{t}</span>)}</div><p className="reason"><Icon name="spark" size={15}/><b>推荐理由：</b>{j.reason}</p><div className="meta"><span>{j.source} · {j.time}</span><button className={saved.includes(j.id)?'saved':''} onClick={()=>toggleSave(j.id)}><Icon name="heart" size={17}/>{saved.includes(j.id)?'已收藏':'收藏'}</button><button onClick={()=>notify('已打开企业投递入口')}><Icon name="link" size={16}/>立即投递</button></div></div><div className="match"><b>{j.score}%</b><span>匹配度</span></div></article>}
  function ResumeSummary(){return <div className="panel resume-summary"><div className="section-head"><h3>简历完整度</h3><b>{uploaded?'92%':'68%'}</b></div><div className="progress"><i style={{width:uploaded?'92%':'68%'}}/></div><p><Icon name="check" size={15}/>已识别 6 项核心能力</p><p><Icon name="check" size={15}/>18 年相关工作经验</p><button onClick={()=>setActive('我的简历')}>优化简历 <Icon name="chevron" size={15}/></button></div>}
  function SkillRadar(){return <div className="panel radar"><div className="section-head"><h3>能力画像</h3><button onClick={()=>setActive('推荐报告')}>查看详情</button></div><div className="radar-body"><div className="radar-chart"><div/><span className="r1">平台架构</span><span className="r2">AI工程</span><span className="r3">行业经验</span><span className="r4">技术管理</span></div><div className="skill-scores"><p><span>平台架构</span><b>98</b></p><p><span>AI 工程化</span><b>92</b></p><p><span>行业经验</span><b>96</b></p><p><span>技术管理</span><b>86</b></p></div></div></div>}
  function PageTitle({title,desc}:{title:string,desc:string}){return <div className="page-title"><div><h1>{title}</h1><p>{desc}</p></div><span className="date">2026年7月14日</span></div>}
}
