

export const translations = {
  en: {
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      actions: "Actions",
      status: "Status",
      date: "Date",
      yes: "Yes",
      no: "No",
    },
    enums: {
      contentType: {
        Recruitment: "Recruitment",
        Notice: "Notice",
        News: "News",
        Tender: "Tender"
      },
      contentStatus: {
        Published: "Published",
        Draft: "Draft",
        Archived: "Archived"
      },
      crawlerStatus: {
        Normal: "Normal",
        Failed: "Failed",
        Pending: "Pending"
      }
    },
    nav: {
      dashboard: "Dashboard",
      content: "Content Hub",
      crawlers: "Monitors",
      users: "Team",
      systemOp: "System Operational",
    },
    header: {
      org: "Organization",
      orgName: "Universe Master Corp",
      admin: "Administrator",
      role: "Super User",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Overview of system performance and data metrics.",
      newToday: "New Today",
      fromYesterday: "+12% from yesterday",
      totalContent: "Total Content",
      historical: "Historical accumulated",
      monitorAbnormal: "Monitor Abnormalities",
      actionRequired: "Action required immediately",
      allNormal: "All systems normal",
      catChart: "Content by Category (7 Days)",
      sourceChart: "Top Sources (7 Days)",
      viewSource: "View source"
    },
    content: {
      title: "Content Management",
      subtitle: "Review, edit, and publish gathered intelligence.",
      searchPlaceholder: "Search title or source...",
      allTypes: "All Types",
      showing: "Showing",
      records: "records",
      cols: {
        title: "Title",
        source: "Source",
        type: "Type",
        date: "Date",
        status: "Status",
        actions: "Actions",
      },
      details: "Details",
      backToList: "Back to List",
      reviewing: "Reviewing",
      saveChanges: "Save Changes",
      prev: "Previous",
      next: "Next",
      originalSnapshot: "Original Page Snapshot",
      previewNote: "Interactive preview not available in prototype.",
      form: {
        title: "Title",
        publishDate: "Publish Date",
        status: "Status",
        category: "Category",
        region: "Region",
        body: "Content Body (Markdown)",
      }
    },
    crawlers: {
      title: "Monitor Configuration",
      subtitle: "Manage crawler targets and extraction rules.",
      tabs: {
        all: "All",
        normal: "Normal",
        failed: "Failed",
        pending: "Pending"
      },
      import: "Import Excel",
      add: "Add Monitor",
      freq: "Freq",
      last: "Last",
      runNow: "Run Now",
      failReason: "Connection timed out",
      wizard: {
        title: "Configure New Monitor",
        step1: "Basic Information",
        step2: "Extraction Rules",
        siteName: "Site Name",
        siteNamePlaceholder: "e.g., City HR Bureau",
        entryUrl: "Entry URL",
        testConn: "Test Connection",
        connSuccess: "Connection Successful",
        connFail: "Connection Failed. Check URL.",
        frequency: "Frequency",
        freqOptions: {
          "1h": "Every Hour",
          "6h": "Every 6 Hours",
          "24h": "Daily"
        },
        listSelector: "List Item Selector",
        bodySelector: "Content Body Selector",
        testRules: "Test Rules",
        nextStep: "Next Step",
        confirmCreate: "Confirm & Create",
        previewTitle: "Mocked Scraped Title 2024",
        previewText: "This is a preview of the scraped text content..."
      }
    },
    users: {
      title: "User Management",
      subtitle: "Manage team access and verify personnel via EHR.",
      systemUsers: "System Users",
      add: "Add User",
      cols: {
        name: "Name",
        phone: "Phone",
        role: "Role",
        joined: "Joined Date",
        status: "Status",
      },
      active: "Active",
      modal: {
        title: "Add New Operator",
        verifyBtn: "Verify & Add",
        note: "Note: Users are verified against the central EHR system using their phone number.",
        fullName: "Full Name",
        phone: "Phone Number",
        error: "EHR Check Failed: Employee not found or inactive."
      }
    }
  },
  zh: {
    common: {
      loading: "加载中...",
      save: "保存",
      cancel: "取消",
      confirm: "确认",
      back: "返回",
      next: "下一步",
      edit: "编辑",
      delete: "删除",
      search: "搜索",
      actions: "操作",
      status: "状态",
      date: "日期",
      yes: "是",
      no: "否",
    },
    enums: {
      contentType: {
        Recruitment: "招聘公告",
        Notice: "通知公示",
        News: "新闻资讯",
        Tender: "招标采购"
      },
      contentStatus: {
        Published: "已发布",
        Draft: "草稿",
        Archived: "已归档"
      },
      crawlerStatus: {
        Normal: "运行正常",
        Failed: "运行失败",
        Pending: "待启用"
      }
    },
    nav: {
      dashboard: "数据看板",
      content: "内容管理",
      crawlers: "监测管理",
      users: "用户管理",
      systemOp: "系统运行正常",
    },
    header: {
      org: "所属组织",
      orgName: "宇宙大师公司",
      admin: "管理员",
      role: "超级用户",
    },
    dashboard: {
      title: "数据看板",
      subtitle: "系统运行状况与核心指标概览。",
      newToday: "今日新增",
      fromYesterday: "较昨日 +12%",
      totalContent: "历史总数",
      historical: "历史累计采集",
      monitorAbnormal: "监测源异常",
      actionRequired: "需立即处理",
      allNormal: "所有系统运行正常",
      catChart: "近7日资讯分类统计",
      sourceChart: "近7日来源 TOP5",
      viewSource: "查看来源"
    },
    content: {
      title: "内容管理",
      subtitle: "审核、编辑及发布采集到的情报资讯。",
      searchPlaceholder: "搜索标题或来源...",
      allTypes: "所有类型",
      showing: "显示",
      records: "条记录",
      cols: {
        title: "标题",
        source: "来源",
        type: "类型",
        date: "发布时间",
        status: "状态",
        actions: "操作",
      },
      details: "详情",
      backToList: "返回列表",
      reviewing: "正在审核",
      saveChanges: "保存修改",
      prev: "上一篇",
      next: "下一篇",
      originalSnapshot: "原始网页快照",
      previewNote: "原型中暂不支持交互预览。",
      form: {
        title: "标题",
        publishDate: "发布时间",
        status: "状态",
        category: "资讯分类",
        region: "所属地区",
        body: "正文内容 (Markdown)",
      }
    },
    crawlers: {
      title: "监测配置管理",
      subtitle: "管理爬虫采集目标及数据提取规则。",
      tabs: {
        all: "全部",
        normal: "运行正常",
        failed: "运行失败",
        pending: "待启用"
      },
      import: "导入 Excel",
      add: "新增监测",
      freq: "频率",
      last: "上次运行",
      runNow: "立即运行",
      failReason: "连接超时 (504)",
      wizard: {
        title: "配置新监测源",
        step1: "基本信息",
        step2: "提取规则配置",
        siteName: "站点名称",
        siteNamePlaceholder: "例如：市人社局官网",
        entryUrl: "入口 URL",
        testConn: "连接测试",
        connSuccess: "连接成功",
        connFail: "连接失败，请检查 URL",
        frequency: "采集频率",
        freqOptions: {
          "1h": "每小时",
          "6h": "每6小时",
          "24h": "每天"
        },
        listSelector: "列表项选择器",
        bodySelector: "正文选择器",
        testRules: "规则测试",
        nextStep: "下一步",
        confirmCreate: "确认并创建",
        previewTitle: "模拟抓取标题 2024",
        previewText: "这是抓取到的正文内容预览..."
      }
    },
    users: {
      title: "用户管理",
      subtitle: "管理团队权限并通过 EHR 系统验证人员。",
      systemUsers: "系统用户列表",
      add: "新增用户",
      cols: {
        name: "姓名",
        phone: "手机号",
        role: "角色",
        joined: "加入时间",
        status: "状态",
      },
      active: "正常",
      modal: {
        title: "新增操作员",
        verifyBtn: "验证并添加",
        note: "注意：用户将通过手机号在中央 EHR 系统中进行验证。",
        fullName: "姓名",
        phone: "手机号",
        error: "EHR 验证失败：员工不存在或已离职。"
      }
    }
  }
};

export type Translation = typeof translations.en;
export type Language = 'en' | 'zh';
