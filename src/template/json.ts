export const json = {
  "/pc/ads/area/getAreaByM": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "产业投资分布--(按用地面积)",
      "operationId": "getStatisticsOfAreaByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getFxByArea": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "区域分析",
      "operationId": "getFxByAreaUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsAreaParam",
            "$ref": "#/definitions/AdsAreaParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsAreaResult»»",
            "$ref": "#/definitions/R«List«AdsAreaResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getIndex": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "顶部指标",
      "operationId": "getIndexUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsZsResult»",
            "$ref": "#/definitions/R«AdsZsResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getProjectByM": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "产业投资分布--(按投资额)",
      "operationId": "getProjectByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getProjectByN": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "产业投资分布--(按项目数)",
      "operationId": "getProjectByNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getProjectDistribution": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "投资项目分布情况",
      "operationId": "getProjectDistributionUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsFbResult»»",
            "$ref": "#/definitions/R«List«AdsFbResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getProjectDistributionByParkId": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "投资项目分布情况--根据园区id查询详情",
      "operationId": "getProjectDistributionByParkIdUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsFbParam",
            "$ref": "#/definitions/AdsFbParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsFbIdResult»»",
            "$ref": "#/definitions/R«List«AdsFbIdResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/area/getTrend": {
    "post": {
      "tags": [
        "产业升级--招商投资"
      ],
      "summary": "投资趋势分析",
      "operationId": "getTrendUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsTzParam",
            "$ref": "#/definitions/AdsTzParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsTzResult»»",
            "$ref": "#/definitions/R«List«AdsTzResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/common/choose/Alla": {
    "post": {
      "tags": [
        "类目表"
      ],
      "summary": "获取部门所有下拉列表值",
      "operationId": "AllaUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«Area»",
            "$ref": "#/definitions/R«Area»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/common/choose/getAdsCommonChooseListResult": {
    "post": {
      "tags": [
        "类目表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsCommonChooseListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsCommonChooseListParam",
            "$ref": "#/definitions/AdsCommonChooseListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsCommonChooseResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsCommonChooseResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/common/choose/getAdsCommonChooseTypeListResult": {
    "get": {
      "tags": [
        "类目表"
      ],
      "summary": "获取type说明",
      "operationId": "getAdsCommonChooseTypeListResultUsingGET",
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsCommonChooseTypeResult»»",
            "$ref": "#/definitions/R«List«AdsCommonChooseTypeResult»»"
          }
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/common/choose/getLevelTreeChooseResult": {
    "post": {
      "tags": [
        "类目表"
      ],
      "summary": "根据type获取多级下拉列表",
      "operationId": "getLevelTreeChooseResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsLevelCommonChooseParam",
            "$ref": "#/definitions/AdsLevelCommonChooseParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«LevelTreeChooseListResult»",
            "$ref": "#/definitions/R«LevelTreeChooseListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/common/choose/getTreeChooseAllListResult": {
    "post": {
      "tags": [
        "类目表"
      ],
      "summary": "根据type获取下拉列表",
      "operationId": "getTreeChooseAllListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsCommonChooseListParam",
            "$ref": "#/definitions/AdsCommonChooseListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«TreeChooseAllListResult»",
            "$ref": "#/definitions/R«TreeChooseAllListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/common/choose/listAllTreeChooseResult": {
    "post": {
      "tags": [
        "类目表"
      ],
      "summary": "获取所有下拉列表值",
      "operationId": "listAllTreeChooseResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«TreeChooseAllListResult»",
            "$ref": "#/definitions/R«TreeChooseAllListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/enterprise/demands/dispose": {
    "post": {
      "tags": [
        "企业诉求"
      ],
      "summary": "诉求处理",
      "operationId": "disposeUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNewsConsultingIdParam",
            "$ref": "#/definitions/AdsNewsConsultingIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/enterprise/demands/getAdsCompanyResultByDId": {
    "post": {
      "tags": [
        "企业诉求"
      ],
      "summary": "通过诉求id单条获取企业详情",
      "operationId": "getAdsCompanyResultByDIdUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsEnterpriseDemandsIdParam",
            "$ref": "#/definitions/AdsEnterpriseDemandsIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsCompanyInfoResult»",
            "$ref": "#/definitions/R«AdsCompanyInfoResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/enterprise/demands/getAdsEnterpriseDemandsIdResult": {
    "post": {
      "tags": [
        "企业诉求"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsEnterpriseDemandsIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsEnterpriseDemandsIdParam",
            "$ref": "#/definitions/AdsEnterpriseDemandsIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsEnterpriseDemandsIdResult»",
            "$ref": "#/definitions/R«AdsEnterpriseDemandsIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/enterprise/demands/getAdsEnterpriseDemandsListResult": {
    "post": {
      "tags": [
        "企业诉求"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsEnterpriseDemandsListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsEnterpriseDemandsListParam",
            "$ref": "#/definitions/AdsEnterpriseDemandsListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsEnterpriseDemandsResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsEnterpriseDemandsResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/enterprise/demands/getNumberOfStatistical": {
    "post": {
      "tags": [
        "企业诉求"
      ],
      "summary": "诉求累计服务企业,累计处理诉求",
      "operationId": "getNumberOfStatisticalUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsEnterpriseDemandsNumResult»",
            "$ref": "#/definitions/R«AdsEnterpriseDemandsNumResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/enterprise/demands/getNumberOfStatisticalNum": {
    "post": {
      "tags": [
        "企业诉求"
      ],
      "summary": "待处理已处理个数",
      "operationId": "getNumberOfStatisticalNumUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsEnterpriseDemandsListNumParam",
            "$ref": "#/definitions/AdsEnterpriseDemandsListNumParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsEnterpriseDemandsNum2Result»",
            "$ref": "#/definitions/R«AdsEnterpriseDemandsNum2Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getInvestmentProjectByConstruction": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "投资项目--建设性质",
      "operationId": "getInvestmentProjectByConstructionUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry8Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry8Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getInvestmentProjectByType": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "投资项目--项目类别",
      "operationId": "getInvestmentProjectByTypeUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry8Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry8Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getKMN001": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "昆明工业经济运行分析（新）-经济指标",
      "operationId": "getCodeDataKMN001UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«object»",
            "$ref": "#/definitions/R«object»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getKMN002": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "昆明工业经济运行分析（新）-发展情况",
      "operationId": "getCodeDataKMN002UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«object»",
            "$ref": "#/definitions/R«object»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getOutputValueGrowthForecast": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "产值增速预测",
      "operationId": "getOutputValueGrowthForecastUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsFrontPageYcResult»»",
            "$ref": "#/definitions/R«List«AdsFrontPageYcResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getRankingByAreaName": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "区县排名",
      "operationId": "getRankingByAreaNameUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsFrontPageResult»»",
            "$ref": "#/definitions/R«List«AdsFrontPageResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getRankingByParkName": {
    "post": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "园区排名",
      "operationId": "getRankingByParkNameUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsFrontPageResult»»",
            "$ref": "#/definitions/R«List«AdsFrontPageResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/front/page/getThirdInvestmentProjects": {
    "get": {
      "tags": [
        "新增首页宏观经济分析大屏"
      ],
      "summary": "招商相对接口数据",
      "operationId": "getThirdInvestmentProjectsUsingGET",
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CodeDataKm006Result»",
            "$ref": "#/definitions/R«CodeDataKm006Result»"
          }
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/industry/dictionary/choose/getAdsIndustryDictionaryResult": {
    "post": {
      "tags": [
        "产业链字典值"
      ],
      "summary": "产业链字典值",
      "operationId": "getAdsIndustryDictionaryResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustryDictionaryResult»»",
            "$ref": "#/definitions/R«List«AdsIndustryDictionaryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/record/deleteMessageRecord": {
    "post": {
      "tags": [
        "统一消息记录表"
      ],
      "summary": "删除消息",
      "operationId": "deleteMessageRecordUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageRecordIdParam",
            "$ref": "#/definitions/AdsMessageRecordIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/record/getdata": {
    "post": {
      "tags": [
        "统一消息记录表"
      ],
      "summary": "获取未读数量",
      "operationId": "getdataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«MessageRecordDateResult»»",
            "$ref": "#/definitions/R«List«MessageRecordDateResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/record/getmessagerecordlistresult": {
    "post": {
      "tags": [
        "统一消息记录表"
      ],
      "summary": "消息列表",
      "operationId": "getMessageRecordListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageRecordListParam",
            "$ref": "#/definitions/AdsMessageRecordListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsMessageRecordResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsMessageRecordResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/record/read": {
    "post": {
      "tags": [
        "统一消息记录表"
      ],
      "summary": "标记已读",
      "operationId": "readUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageRecordIdParam",
            "$ref": "#/definitions/AdsMessageRecordIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/record/readAll": {
    "post": {
      "tags": [
        "统一消息记录表"
      ],
      "summary": "全部标记已读",
      "operationId": "readAllUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageRecordIdsParam",
            "$ref": "#/definitions/AdsMessageRecordIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/record/saveMessage": {
    "post": {
      "tags": [
        "统一消息记录表"
      ],
      "summary": "统一消息存储接口",
      "operationId": "saveMessageUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageRecordAddParam",
            "$ref": "#/definitions/AdsMessageRecordAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/addAdsMessageSwiAddParam": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "新增",
      "operationId": "addAdsMessageSwiAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiAddParam",
            "$ref": "#/definitions/AdsMessageSwiAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/deleteByIds": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiIdsParam",
            "$ref": "#/definitions/AdsMessageSwiIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/getAdsMessageSwiDetailResult": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "列表单条记录详情",
      "operationId": "getAdsMessageSwiDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiIdParam",
            "$ref": "#/definitions/AdsMessageSwiIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsMessageSwiDetailResult»",
            "$ref": "#/definitions/R«AdsMessageSwiDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/getAdsMessageSwiIdResult": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsMessageSwiIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiIdParam",
            "$ref": "#/definitions/AdsMessageSwiIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsMessageSwiIdResult»",
            "$ref": "#/definitions/R«AdsMessageSwiIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/getAdsMessageSwiListResult": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsMessageSwiListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiListParam",
            "$ref": "#/definitions/AdsMessageSwiListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsMessageSwiResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsMessageSwiResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/listExcelExport": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "分页列表-excel导出数据",
      "operationId": "listExcelExportUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiListParam",
            "$ref": "#/definitions/AdsMessageSwiListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ExcelExportResult»",
            "$ref": "#/definitions/R«ExcelExportResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/swi/update": {
    "post": {
      "tags": [
        "消息订阅开关"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageSwiUpdateParam",
            "$ref": "#/definitions/AdsMessageSwiUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/type/addtype": {
    "get": {
      "tags": [
        "消息类型表"
      ],
      "summary": "新增类型列表",
      "operationId": "addTypeUsingGET",
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageTypeAddParam",
            "$ref": "#/definitions/AdsMessageTypeAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/type/getlisttype": {
    "get": {
      "tags": [
        "消息类型表"
      ],
      "summary": "获取类型列表",
      "operationId": "getListTypeUsingGET",
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsMessageTypeResult»»",
            "$ref": "#/definitions/R«List«AdsMessageTypeResult»»"
          }
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/message/type/updatetype": {
    "get": {
      "tags": [
        "消息类型表"
      ],
      "summary": "修改类型列表",
      "operationId": "updateTypeUsingGET",
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsMessageTypeUpdateParam",
            "$ref": "#/definitions/AdsMessageTypeUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/news/consulting/addAdsNewsConsultingAddParam": {
    "post": {
      "tags": [
        "新闻资讯"
      ],
      "summary": "新增",
      "operationId": "addAdsNewsConsultingAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNewsConsultingAddParam",
            "$ref": "#/definitions/AdsNewsConsultingAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/news/consulting/deleteByIds": {
    "post": {
      "tags": [
        "新闻资讯"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNewsConsultingIdsParam",
            "$ref": "#/definitions/AdsNewsConsultingIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/news/consulting/getAdsNewsConsultingIdResult": {
    "post": {
      "tags": [
        "新闻资讯"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsNewsConsultingIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNewsConsultingIdParam",
            "$ref": "#/definitions/AdsNewsConsultingIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsNewsConsultingIdResult»",
            "$ref": "#/definitions/R«AdsNewsConsultingIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/news/consulting/getAdsNewsConsultingListResult": {
    "post": {
      "tags": [
        "新闻资讯"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsNewsConsultingListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNewsConsultingListParam",
            "$ref": "#/definitions/AdsNewsConsultingListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsNewsConsultingResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsNewsConsultingResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/news/consulting/update": {
    "post": {
      "tags": [
        "新闻资讯"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNewsConsultingUpdateParam",
            "$ref": "#/definitions/AdsNewsConsultingUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/addAdsNoticeAddParam": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "新增",
      "operationId": "addAdsNoticeAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeAddParam",
            "$ref": "#/definitions/AdsNoticeAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/deleteByIds": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_2",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeIdsParam",
            "$ref": "#/definitions/AdsNoticeIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/floatingWindow": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "浮窗展示",
      "operationId": "floatingWindowUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeId2Param",
            "$ref": "#/definitions/AdsNoticeId2Param"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/getAdsCoUserListResult": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "企业侧人员列表",
      "operationId": "getAdsCoUserListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeListByCoUserParam",
            "$ref": "#/definitions/AdsNoticeListByCoUserParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsNoticeCoUserResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsNoticeCoUserResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/getAdsNoticeIdResult": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsNoticeIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeIdParam",
            "$ref": "#/definitions/AdsNoticeIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsNoticeIdResult»",
            "$ref": "#/definitions/R«AdsNoticeIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/getAdsNoticeListResult": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsNoticeListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeListParam",
            "$ref": "#/definitions/AdsNoticeListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsNoticeResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsNoticeResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/getAdsSysUserListResult": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "政府侧人员列表",
      "operationId": "getAdsSysUserListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeListBySysUserParam",
            "$ref": "#/definitions/AdsNoticeListBySysUserParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsNoticeBySysUserResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsNoticeBySysUserResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/grounding": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "上架",
      "operationId": "groundingUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeIdParam",
            "$ref": "#/definitions/AdsNoticeIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/shelves": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "下架",
      "operationId": "shelvesUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeIdParam",
            "$ref": "#/definitions/AdsNoticeIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/notice/update": {
    "post": {
      "tags": [
        "辅助功能-通知公告"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_2",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsNoticeUpdateParam",
            "$ref": "#/definitions/AdsNoticeUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/analyse/chain/info/getAdsParkAnalyseChainInfoListResult": {
    "post": {
      "tags": [
        "园区产业链分析表"
      ],
      "summary": "获取产业链信息",
      "operationId": "getAdsParkAnalyseChainInfoListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkAnalyseChainInfoListParam",
            "$ref": "#/definitions/AdsParkAnalyseChainInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkAnalyseChainInfoResult»»",
            "$ref": "#/definitions/R«List«AdsParkAnalyseChainInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/analyse/chain/info/getAdsParkIndustryDetailResult": {
    "post": {
      "tags": [
        "园区产业链分析表"
      ],
      "summary": "获取产业类别",
      "operationId": "getAdsParkIndustryDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkAnalyseChainInfoIdParam",
            "$ref": "#/definitions/AdsParkAnalyseChainInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryNameResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryNameResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/analyse/info/getAdsParkAnalyseInfoDetailResult": {
    "post": {
      "tags": [
        "园区分析主表"
      ],
      "summary": "列表单条记录详情",
      "operationId": "getAdsParkAnalyseInfoDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkAnalyseInfoIdParam",
            "$ref": "#/definitions/AdsParkAnalyseInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsParkAnalyseInfoDetailResult»",
            "$ref": "#/definitions/R«AdsParkAnalyseInfoDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/area/info/getAdsAreaInfoList": {
    "post": {
      "tags": [
        "产业升级-土地资源"
      ],
      "summary": "招商地块分析-区县分析",
      "operationId": "getAdsAreaInfoListUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkAreaInfoResult»»",
            "$ref": "#/definitions/R«List«AdsParkAreaInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/area/info/getAdsAreaLandUseResult": {
    "post": {
      "tags": [
        "产业升级-土地资源"
      ],
      "summary": "各县区产业招商用地分布情况",
      "operationId": "getAdsAreaLandUseResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkAreaResult»»",
            "$ref": "#/definitions/R«List«AdsParkAreaResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/area/info/getAdsParkInfoList": {
    "post": {
      "tags": [
        "产业升级-土地资源"
      ],
      "summary": "招商地块分析-园区分析",
      "operationId": "getAdsParkInfoListUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkAreaInfoResult»»",
            "$ref": "#/definitions/R«List«AdsParkAreaInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/area/info/getAdsParkLandUseResult": {
    "post": {
      "tags": [
        "产业升级-土地资源"
      ],
      "summary": "各园区产业招商用地分布情况",
      "operationId": "getAdsParkLandUseResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkAreaResult»»",
            "$ref": "#/definitions/R«List«AdsParkAreaResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getAdsParkBaseInfoIdResult": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsParkBaseInfoIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkBaseInfoIdParam",
            "$ref": "#/definitions/AdsParkBaseInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsParkBaseInfoIdResult»",
            "$ref": "#/definitions/R«AdsParkBaseInfoIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getAdsParkBaseInfoListResult": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsParkBaseInfoListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkBaseInfoListParam",
            "$ref": "#/definitions/AdsParkBaseInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsParkBaseInfoResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsParkBaseInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getAdsParkImgListResult1": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "园区群画像--规划指标对标",
      "operationId": "getAdsParkImgListResult1UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkImgBaseInfoQueryParam",
            "$ref": "#/definitions/AdsParkImgBaseInfoQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkKpiInfoImgResult»»",
            "$ref": "#/definitions/R«List«AdsParkKpiInfoImgResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getCompanyInfoByParkIdListResult": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "根据园区id获取园区内企业信息",
      "operationId": "getCompanyInfoByParkIdListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkBaseInfoIdParam",
            "$ref": "#/definitions/AdsParkBaseInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkCompanyInfoResult»»",
            "$ref": "#/definitions/R«List«AdsParkCompanyInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getKMG001": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "获取大屏指标值",
      "operationId": "getCodeDataKMG001UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsKpiQueryParam",
            "$ref": "#/definitions/AdsKpiQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«object»",
            "$ref": "#/definitions/R«object»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getKMT000": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "园区地图详情和根据园区id获取园区信息",
      "operationId": "getCodeDataKMT000UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam2",
            "$ref": "#/definitions/BigScreenQueryParam2"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List»",
            "$ref": "#/definitions/R«List»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getKMT001": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "获取区域或者园区的指标值",
      "operationId": "getCodeDataKMT001UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam2",
            "$ref": "#/definitions/BigScreenQueryParam2"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List»",
            "$ref": "#/definitions/R«List»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getKMT002": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "产业分析",
      "operationId": "getCodeDataKMT002UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam2",
            "$ref": "#/definitions/BigScreenQueryParam2"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List»",
            "$ref": "#/definitions/R«List»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getKMT003": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "行业分析",
      "operationId": "getCodeDataKMT003UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam2",
            "$ref": "#/definitions/BigScreenQueryParam2"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List»",
            "$ref": "#/definitions/R«List»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/base/info/getKMT004": {
    "post": {
      "tags": [
        "园区基本信息表"
      ],
      "summary": "园区主辅产业",
      "operationId": "getCodeDataKMT004UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam2",
            "$ref": "#/definitions/BigScreenQueryParam2"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List»",
            "$ref": "#/definitions/R«List»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryDevelopmentResult": {
    "post": {
      "tags": [
        "园区产业-园区分析"
      ],
      "summary": "园区产业发展情况",
      "operationId": "getAdsParkIndustryDevelopmentResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryValueMParam",
            "$ref": "#/definitions/AdsParkIndustryValueMParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryDevelopmentResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryDevelopmentResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryMonthResult": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "近12月产值分布情况",
      "operationId": "getAdsParkIndustryMonthResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryMonthParam",
            "$ref": "#/definitions/AdsParkIndustryMonthParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryMonthResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryMonthResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryProjectM": {
    "post": {
      "tags": [
        "园区产业-园区分析"
      ],
      "summary": "园区投资趋势--按投资额度",
      "operationId": "getAdsParkIndustryProjectMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryValueMParam",
            "$ref": "#/definitions/AdsParkIndustryValueMParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkProjectResult»»",
            "$ref": "#/definitions/R«List«AdsParkProjectResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryProjectN": {
    "post": {
      "tags": [
        "园区产业-园区分析"
      ],
      "summary": "园区投资趋势--按项目数量",
      "operationId": "getAdsParkIndustryProjectNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryValueMParam",
            "$ref": "#/definitions/AdsParkIndustryValueMParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkProjectResult»»",
            "$ref": "#/definitions/R«List«AdsParkProjectResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryValueMResult": {
    "post": {
      "tags": [
        "园区产业-园区分析"
      ],
      "summary": "近12月产值分布情况",
      "operationId": "getAdsIndustryValuesResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryValueMParam",
            "$ref": "#/definitions/AdsParkIndustryValueMParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustryValuesResult»»",
            "$ref": "#/definitions/R«List«AdsIndustryValuesResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryValueYResult": {
    "post": {
      "tags": [
        "园区产业-园区分析"
      ],
      "summary": "近5年产值分布情况",
      "operationId": "getAdsParkIndustryValueYResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryValueMParam",
            "$ref": "#/definitions/AdsParkIndustryValueMParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustryValuesResult»»",
            "$ref": "#/definitions/R«List«AdsIndustryValuesResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAdsParkIndustryYearResult": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "近10年产值分布情况",
      "operationId": "getAdsParkIndustryYearResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryMonthParam",
            "$ref": "#/definitions/AdsParkIndustryMonthParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryMonthResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryMonthResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAnalysisOfOutputValue": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "产业链环产值分析",
      "operationId": "getAnalysisOfOutputValueUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustryChainInfoStatisticsDetailResult»»",
            "$ref": "#/definitions/R«List«AdsIndustryChainInfoStatisticsDetailResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getAnalysisOfOutputValueByParkId": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "产值分布情况--园区各产业链分析",
      "operationId": "getAnalysisOfOutputValueByParkIdUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkInfoStatisticsChainResult»»",
            "$ref": "#/definitions/R«List«AdsParkInfoStatisticsChainResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getCoNumAndParkValue": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "园区企业数量,园区工业产值",
      "operationId": "getCoNumAndParkValueUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsCoNumAndParkValueResult»",
            "$ref": "#/definitions/R«AdsCoNumAndParkValueResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getFocusOnCo": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "龙头企业",
      "operationId": "getFocusOnCoUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoListParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsParkIndustryChainInfoCResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsParkIndustryChainInfoCResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getFocusOnProject": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "重点项目",
      "operationId": "getFocusOnProjectUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryChainInfoDResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryChainInfoDResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getParkAnalysisOfOutputValue": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "产值分布情况--产业链环产值分析",
      "operationId": "getParkAnalysisOfOutputValueUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkInfoStatisticsResult»»",
            "$ref": "#/definitions/R«List«AdsParkInfoStatisticsResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getParkXqByM": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "各园区投资情况--按投资额",
      "operationId": "getParkXqByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryChainInfoBResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryChainInfoBResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getParkXqByN": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "各园区投资情况--按项目数量",
      "operationId": "getParkXqByNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkIndustryChainInfoBResult»»",
            "$ref": "#/definitions/R«List«AdsParkIndustryChainInfoBResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/industry/chain/info/getProjectDistribution": {
    "post": {
      "tags": [
        "园区产业--按产业"
      ],
      "summary": "投资项目分布情况",
      "operationId": "getProjectDistributionUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkIndustryChainInfoAParam",
            "$ref": "#/definitions/AdsParkIndustryChainInfoAParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry13Result»",
            "$ref": "#/definitions/R«AdsIndustry13Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/kpi/info/getAdsParkKpiInfoIdResult": {
    "post": {
      "tags": [
        "园区经营指标信息表"
      ],
      "summary": "通过园区id或者名称单条获取指标数据",
      "operationId": "getAdsParkKpiInfoIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkKpiInfoIdParam",
            "$ref": "#/definitions/AdsParkKpiInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsParkKpiInfoIdResult»",
            "$ref": "#/definitions/R«AdsParkKpiInfoIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/park/kpi/info/getAdsParkKpiInfoListByAreaNameResult": {
    "post": {
      "tags": [
        "园区经营指标信息表"
      ],
      "summary": "通过区域名称单条获取指标数据",
      "operationId": "getAdsParkKpiInfoListByAreaNameResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsParkKpiInfoIdParam",
            "$ref": "#/definitions/AdsParkKpiInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsParkKpiInfoIdResult»",
            "$ref": "#/definitions/R«AdsParkKpiInfoIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/addAdsPolicyInfoAddParam": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "新增",
      "operationId": "addAdsPolicyInfoAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoAddParam",
            "$ref": "#/definitions/AdsPolicyInfoAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/deleteByIds": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_3",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdsParam",
            "$ref": "#/definitions/AdsPolicyInfoIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/getAdsDeptListResult": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "牵头部门列表",
      "operationId": "getAdsDeptListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdParam",
            "$ref": "#/definitions/AdsPolicyInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsPolicyDeptResult»»",
            "$ref": "#/definitions/R«List«AdsPolicyDeptResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/getAdsDeptListResultByArea": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "根据地区查找部门",
      "operationId": "getAdsDeptListResultByAreaUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdParam",
            "$ref": "#/definitions/AdsPolicyInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsPolicyDeptResult»»",
            "$ref": "#/definitions/R«List«AdsPolicyDeptResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/getAdsPolicyInfoIdResult": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsPolicyInfoIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdParam",
            "$ref": "#/definitions/AdsPolicyInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsPolicyInfoIdResult»",
            "$ref": "#/definitions/R«AdsPolicyInfoIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/getAdsPolicyInfoListResult": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsPolicyInfoListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoListParam",
            "$ref": "#/definitions/AdsPolicyInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsPolicyInfoResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsPolicyInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/release": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "发布",
      "operationId": "releaseUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdParam",
            "$ref": "#/definitions/AdsPolicyInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/shelves": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "上架",
      "operationId": "shelvesUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdParam",
            "$ref": "#/definitions/AdsPolicyInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/soldOut": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "下架",
      "operationId": "soldOutUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoIdParam",
            "$ref": "#/definitions/AdsPolicyInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/policy/info/update": {
    "post": {
      "tags": [
        "政策信息"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_3",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsPolicyInfoUpdateParam",
            "$ref": "#/definitions/AdsPolicyInfoUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/info/getAdsProductProviderCountResult": {
    "post": {
      "tags": [
        "企业产品供应信息表"
      ],
      "summary": "获取不同状态的数量",
      "operationId": "getAdsProductProviderCountResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderInfoListParam",
            "$ref": "#/definitions/AdsProductProviderInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProductProviderCountResult»»",
            "$ref": "#/definitions/R«List«AdsProductProviderCountResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/info/getAdsProductProviderInfoDetailResult": {
    "post": {
      "tags": [
        "企业产品供应信息表"
      ],
      "summary": "列表单条记录详情",
      "operationId": "getAdsProductProviderInfoDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderInfoIdParam",
            "$ref": "#/definitions/AdsProductProviderInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProductProviderInfoDetailResult»",
            "$ref": "#/definitions/R«AdsProductProviderInfoDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/info/getAdsProductProviderInfoListResult": {
    "post": {
      "tags": [
        "企业产品供应信息表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsProductProviderInfoListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderInfoListParam",
            "$ref": "#/definitions/AdsProductProviderInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProductProviderInfoResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProductProviderInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/info/update": {
    "post": {
      "tags": [
        "企业产品供应信息表"
      ],
      "summary": "审核提交",
      "operationId": "updateUsingPOST_4",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogAddParam",
            "$ref": "#/definitions/AdsProductProviderLogAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/info/updateUpOrDown": {
    "post": {
      "tags": [
        "企业产品供应信息表"
      ],
      "summary": "上架/下架",
      "operationId": "updateUpOrDownUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderInfoIdParam",
            "$ref": "#/definitions/AdsProductProviderInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/addAdsProductProviderLogAddParam": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "新增",
      "operationId": "addAdsProductProviderLogAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogAddParam",
            "$ref": "#/definitions/AdsProductProviderLogAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/deleteByIds": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_4",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogIdsParam",
            "$ref": "#/definitions/AdsProductProviderLogIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/getAdsProductProviderLogDetailResult": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "列表单条记录详情",
      "operationId": "getAdsProductProviderLogDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogIdParam",
            "$ref": "#/definitions/AdsProductProviderLogIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProductProviderLogDetailResult»",
            "$ref": "#/definitions/R«AdsProductProviderLogDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/getAdsProductProviderLogIdResult": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsProductProviderLogIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogIdParam",
            "$ref": "#/definitions/AdsProductProviderLogIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProductProviderLogIdResult»",
            "$ref": "#/definitions/R«AdsProductProviderLogIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/getAdsProductProviderLogListResult": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsProductProviderLogListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogListParam",
            "$ref": "#/definitions/AdsProductProviderLogListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProductProviderLogResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProductProviderLogResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/listExcelExport": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "分页列表-excel导出数据",
      "operationId": "listExcelExportUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogListParam",
            "$ref": "#/definitions/AdsProductProviderLogListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ExcelExportResult»",
            "$ref": "#/definitions/R«ExcelExportResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/product/provider/log/update": {
    "post": {
      "tags": [
        "企业产品供应审核日志记录表"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_5",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProductProviderLogUpdateParam",
            "$ref": "#/definitions/AdsProductProviderLogUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getBenefitOfInvestment": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "投资效益",
      "operationId": "getBenefitOfInvestmentUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry10Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry10Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getIndustrialProjects": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "产业项目",
      "operationId": "getIndustrialProjectsUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustryResult»",
            "$ref": "#/definitions/R«AdsIndustryResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getIndustryAnalysisByM": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "行业分析(按金额)",
      "operationId": "getIndustryAnalysisByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry11Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry11Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getIndustryAnalysisByN": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "行业分析(按数量)",
      "operationId": "getIndustryAnalysisByNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry11Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry11Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getInvestmentScale": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "投资规模",
      "operationId": "getInvestmentScaleUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry9Result»",
            "$ref": "#/definitions/R«AdsIndustry9Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getInvestmentStructure": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "项目总览--投资结构",
      "operationId": "getInvestmentStructureUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry8Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry8Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getInvestmentStructureB": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "投资分析--投资结构",
      "operationId": "getInvestmentStructureBUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry12Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry12Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getKanbanIndex": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "看板指标",
      "operationId": "getKanbanIndexUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry7Result»",
            "$ref": "#/definitions/R«AdsIndustry7Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getProposedInvestment": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "累计拟投资",
      "operationId": "getProposedInvestmentUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry2Result»",
            "$ref": "#/definitions/R«AdsIndustry2Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getPutMoneyInPlace": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "到位资金",
      "operationId": "getPutMoneyInPlaceUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry3Result»",
            "$ref": "#/definitions/R«AdsIndustry3Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getStatisticsOfIndustryByM": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "产业统计(按投资额)",
      "operationId": "getStatisticsOfIndustryByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getStatisticsOfIndustryByN": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "产业统计(按项目数)",
      "operationId": "getStatisticsOfIndustryByNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getStatusOfConstruction": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "建设情况",
      "operationId": "getStatusOfConstructionUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry8Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry8Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getTrendsInInvestmentByM": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "投资趋势(新增投资)",
      "operationId": "getTrendsInInvestmentByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry11Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry11Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/billboard/getTrendsInInvestmentByN": {
    "post": {
      "tags": [
        "看板"
      ],
      "summary": "投资趋势(到位资金)",
      "operationId": "getTrendsInInvestmentByNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsIndustry11Result»»",
            "$ref": "#/definitions/R«List«AdsIndustry11Result»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/addAdsProjectFileAddParam": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "新增",
      "operationId": "addAdsProjectFileAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileAddParam",
            "$ref": "#/definitions/AdsProjectFileAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/addCount": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "下载次数新增",
      "operationId": "addCountUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileIdParam",
            "$ref": "#/definitions/AdsProjectFileIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/deleteByIds": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_5",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileIdsParam",
            "$ref": "#/definitions/AdsProjectFileIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/getAdsProjectFileIdResult": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsProjectFileIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileIdParam",
            "$ref": "#/definitions/AdsProjectFileIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectFileIdResult»",
            "$ref": "#/definitions/R«AdsProjectFileIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/getAdsProjectFileListResult": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsProjectFileListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileListParam",
            "$ref": "#/definitions/AdsProjectFileListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectFileResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectFileResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/getAdsProjectFileNumByType": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "项目各类型数量",
      "operationId": "getAdsProjectFileNumByTypeUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileList2Param",
            "$ref": "#/definitions/AdsProjectFileList2Param"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectFileNumResult»",
            "$ref": "#/definitions/R«AdsProjectFileNumResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/file/update": {
    "post": {
      "tags": [
        "项目档案"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_6",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectFileUpdateParam",
            "$ref": "#/definitions/AdsProjectFileUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/image/addAdsProjectImageAddParam": {
    "post": {
      "tags": [
        "项目形象进度"
      ],
      "summary": "新增",
      "operationId": "addAdsProjectImageAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectImageAddParam",
            "$ref": "#/definitions/AdsProjectImageAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/image/deleteByIds": {
    "post": {
      "tags": [
        "项目形象进度"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_6",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectImageIdsParam",
            "$ref": "#/definitions/AdsProjectImageIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/image/getAdsProjectImageIdResult": {
    "post": {
      "tags": [
        "项目形象进度"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsProjectImageIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectImageIdParam",
            "$ref": "#/definitions/AdsProjectImageIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectImageIdResult»",
            "$ref": "#/definitions/R«AdsProjectImageIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/image/getAdsProjectImageListResult": {
    "post": {
      "tags": [
        "项目形象进度"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsProjectImageListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectImageListParam",
            "$ref": "#/definitions/AdsProjectImageListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectImageResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectImageResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/image/update": {
    "post": {
      "tags": [
        "项目形象进度"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_7",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectImageUpdateParam",
            "$ref": "#/definitions/AdsProjectImageUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/addAdsProjectInfoAddParam": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "新增",
      "operationId": "addAdsProjectInfoAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInfoAddParam",
            "$ref": "#/definitions/AdsProjectInfoAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/deleteByIds": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_7",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInfoIdsParam",
            "$ref": "#/definitions/AdsProjectInfoIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/getAdsParkList": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "园区列表",
      "operationId": "getAdsParkListUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsParkBaseInfoResult»»",
            "$ref": "#/definitions/R«List«AdsParkBaseInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/getAdsProjectInfoIdResult": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsProjectInfoIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInfoIdParam",
            "$ref": "#/definitions/AdsProjectInfoIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectInfoIdResult»",
            "$ref": "#/definitions/R«AdsProjectInfoIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/getAdsProjectInfoListResult": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsProjectInfoListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInfoListParam",
            "$ref": "#/definitions/AdsProjectInfoListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectInfoResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectInfoResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/getAdsProjectInfoTypeNum": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "列表各阶段数量",
      "operationId": "getAdsProjectInfoTypeNumUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInfoList2Param",
            "$ref": "#/definitions/AdsProjectInfoList2Param"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectInfoNumResult»",
            "$ref": "#/definitions/R«AdsProjectInfoNumResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/info/update": {
    "post": {
      "tags": [
        "投资项目"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_8",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInfoUpdateParam",
            "$ref": "#/definitions/AdsProjectInfoUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/addAdsProjectInvestPlanAddParam": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "新增",
      "operationId": "addAdsProjectInvestPlanAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInvestPlanAddParam",
            "$ref": "#/definitions/AdsProjectInvestPlanAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/deleteByIds": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_8",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInvestPlanIdsParam",
            "$ref": "#/definitions/AdsProjectInvestPlanIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/getAdsProjectInvestPlanListResult": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "投资进度-列表分页获取",
      "operationId": "getAdsProjectInvestPlanListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInvestPlanListParam",
            "$ref": "#/definitions/AdsProjectInvestPlanListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectInvestPlanResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectInvestPlanResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/isExistAdsProjectInvestPlanListResult": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "投资进度-判断是否存填写的月份数据",
      "operationId": "isExistAdsProjectInvestPlanListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInvestPlanListParam",
            "$ref": "#/definitions/AdsProjectInvestPlanListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/listExcelExport": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "分页列表-excel导出数据",
      "operationId": "listExcelExportUsingPOST_2",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInvestPlanListParam",
            "$ref": "#/definitions/AdsProjectInvestPlanListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ExcelExportResult»",
            "$ref": "#/definitions/R«ExcelExportResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/saveBatch": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "投资报表--批量新增导入数据",
      "operationId": "saveBatchUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectExcelListParam",
            "$ref": "#/definitions/AdsProjectExcelListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/update": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_9",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectInvestPlanUpdateParam",
            "$ref": "#/definitions/AdsProjectInvestPlanUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/invest/plan/upload": {
    "post": {
      "tags": [
        "投资进度计划"
      ],
      "summary": "投资报表--批量导入回显",
      "operationId": "excelAnalysisType1UsingPOST",
      "consumes": [
        "multipart/form-data"
      ],
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "file",
          "in": "formData",
          "description": "上传的excel文件",
          "required": true,
          "type": "array",
          "items": {
            "originalRef": "MultipartFile",
            "$ref": "#/definitions/MultipartFile"
          },
          "collectionFormat": "multi"
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectExcelListResult»",
            "$ref": "#/definitions/R«AdsProjectExcelListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "1"
    }
  },
  "/pc/ads/project/node/getAdsProjectNodeListResult": {
    "post": {
      "tags": [
        "项目建设节点信息表"
      ],
      "summary": "列表获取",
      "operationId": "getAdsProjectNodeListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectNodeListParam",
            "$ref": "#/definitions/AdsProjectNodeListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectNodeResult»»",
            "$ref": "#/definitions/R«List«AdsProjectNodeResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/node/rel/status/addAdsProjectNodeRelStatusAddParam": {
    "post": {
      "tags": [
        "项目建设节点关联信息表信息表"
      ],
      "summary": "新增建设进度",
      "operationId": "addAdsProjectNodeRelStatusAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "list",
          "description": "list",
          "required": true,
          "schema": {
            "type": "array",
            "items": {
              "originalRef": "AdsProjectNodeRelStatusAddParam",
              "$ref": "#/definitions/AdsProjectNodeRelStatusAddParam"
            }
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/node/rel/status/getAdsProjectNodeRelStatusListResult": {
    "post": {
      "tags": [
        "项目建设节点关联信息表信息表"
      ],
      "summary": "根据项目id获取建设进度列表",
      "operationId": "getAdsProjectNodeRelStatusListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectNodeRelStatusListParam",
            "$ref": "#/definitions/AdsProjectNodeRelStatusListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectNodeRelStatusResult»»",
            "$ref": "#/definitions/R«List«AdsProjectNodeRelStatusResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/node/rel/status/getAdsProjectNodeRelStepListResult": {
    "post": {
      "tags": [
        "项目建设节点关联信息表信息表"
      ],
      "summary": "根据项目id获取建设进度步骤",
      "operationId": "getAdsProjectNodeRelStepListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectNodeRelStatusListParam",
            "$ref": "#/definitions/AdsProjectNodeRelStatusListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectNodeRelStepResult»»",
            "$ref": "#/definitions/R«List«AdsProjectNodeRelStepResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/node/rel/status/update": {
    "post": {
      "tags": [
        "项目建设节点关联信息表信息表"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_10",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectNodeRelStatusUpdateParam",
            "$ref": "#/definitions/AdsProjectNodeRelStatusUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/addAdsProjectProblemAddParam": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "新增",
      "operationId": "addAdsProjectProblemAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemAddParam",
            "$ref": "#/definitions/AdsProjectProblemAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/deleteByIds": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_9",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemIdsParam",
            "$ref": "#/definitions/AdsProjectProblemIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/dispose": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "处理",
      "operationId": "disposeUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemDealParam",
            "$ref": "#/definitions/AdsProjectProblemDealParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/getAdsProjectProblemAllListResult": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "全部列表---列表分页获取",
      "operationId": "getAdsProjectProblemAllListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemList2Param",
            "$ref": "#/definitions/AdsProjectProblemList2Param"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectProblemResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectProblemResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/getAdsProjectProblemCountResult": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "项目里面列表数量",
      "operationId": "getAdsProjectProblemCountResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemIdParam",
            "$ref": "#/definitions/AdsProjectProblemIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectProblemCountResult»",
            "$ref": "#/definitions/R«AdsProjectProblemCountResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/getAdsProjectProblemIdResult": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsProjectProblemIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemIdParam",
            "$ref": "#/definitions/AdsProjectProblemIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectProblemIdResult»",
            "$ref": "#/definitions/R«AdsProjectProblemIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/getAdsProjectProblemListResult": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "项目里面列表---列表分页获取",
      "operationId": "getAdsProjectProblemListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemListParam",
            "$ref": "#/definitions/AdsProjectProblemListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectProblemResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectProblemResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/problem/update": {
    "post": {
      "tags": [
        "问题反馈"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_11",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectProblemUpdateParam",
            "$ref": "#/definitions/AdsProjectProblemUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/supervision/getAdsProjectSupervisionAllListResult": {
    "post": {
      "tags": [
        "项目监督"
      ],
      "summary": "外部列表---列表分页获取",
      "operationId": "getAdsProjectSupervisionAllListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectSupervisionListParam",
            "$ref": "#/definitions/AdsProjectSupervisionListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectSupervisionResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectSupervisionResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/supervision/getAdsProjectSupervisionIdResult": {
    "post": {
      "tags": [
        "项目监督"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsProjectSupervisionIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectSupervisionIdParam",
            "$ref": "#/definitions/AdsProjectSupervisionIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectSupervisionIdResult»",
            "$ref": "#/definitions/R«AdsProjectSupervisionIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/supervision/getAdsProjectSupervisionListResult": {
    "post": {
      "tags": [
        "项目监督"
      ],
      "summary": "项目里面---列表分页获取",
      "operationId": "getAdsProjectSupervisionListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectSupervisionListParam",
            "$ref": "#/definitions/AdsProjectSupervisionListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectSupervisionResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectSupervisionResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/addAdsProjectUserAddParam": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "新增用户",
      "operationId": "addAdsProjectUserAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectUserAddParam",
            "$ref": "#/definitions/AdsProjectUserAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/getAdsProjectUserIdResult": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "通过id编辑回显用户数据",
      "operationId": "getAdsProjectUserIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectUserIdParam",
            "$ref": "#/definitions/AdsProjectUserIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsProjectUserIdResult»",
            "$ref": "#/definitions/R«AdsProjectUserIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/getAdsProjectUserListResult": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsProjectUserListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectUserListParam",
            "$ref": "#/definitions/AdsProjectUserListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsProjectUserResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsProjectUserResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/getParkInfoList": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "新增用户--获取所属园区",
      "operationId": "getParkInfoListUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«ParkListResult»»",
            "$ref": "#/definitions/R«List«ParkListResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/getUserInfoByUsername": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "新增用户--通过用户真实姓名模糊查询用户信息",
      "operationId": "getUserInfoByUsernameUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysUserIdParam",
            "$ref": "#/definitions/SysUserIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«SysUserListResult»»",
            "$ref": "#/definitions/R«List«SysUserListResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/update": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "通过id用户编辑更新数据",
      "operationId": "updateUsingPOST_12",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectUserUpdateParam",
            "$ref": "#/definitions/AdsProjectUserUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/updateStart": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "启动",
      "operationId": "updateStartUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectUserIdParam",
            "$ref": "#/definitions/AdsProjectUserIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/user/updateStartOrStop": {
    "post": {
      "tags": [
        "项目子系统用户信息表"
      ],
      "summary": "停用",
      "operationId": "updateStopUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectUserIdParam",
            "$ref": "#/definitions/AdsProjectUserIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getEarlyWrningOfProject": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "项目预警",
      "operationId": "getEarlyWrningOfProjectUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry5Result»",
            "$ref": "#/definitions/R«AdsIndustry5Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getIndustrialProjects": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "产业项目",
      "operationId": "getIndustrialProjectsUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustryResult»",
            "$ref": "#/definitions/R«AdsIndustryResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getLandByM": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "用地情况分析(按面积)",
      "operationId": "getLandByMUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getLandByN": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "用地情况分析(按数量)",
      "operationId": "getLandByNUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getNews": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "新闻资讯",
      "operationId": "getNewsUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry6ListResult»",
            "$ref": "#/definitions/R«AdsIndustry6ListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getNotificationAnnouncement": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "通知公告",
      "operationId": "getNotificationAnnouncementUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry6ListResult»",
            "$ref": "#/definitions/R«AdsIndustry6ListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getProblemWorkOrder": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "问题工单",
      "operationId": "getProblemWorkOrderUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry4Result»",
            "$ref": "#/definitions/R«AdsIndustry4Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getProposedInvestment": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "累计拟投资",
      "operationId": "getProposedInvestmentUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry2Result»",
            "$ref": "#/definitions/R«AdsIndustry2Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getPutMoneyInPlace": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "到位资金",
      "operationId": "getPutMoneyInPlaceUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsIndustry3Result»",
            "$ref": "#/definitions/R«AdsIndustry3Result»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getStatisticsOfIndustryByM": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "产业统计(按投资额)",
      "operationId": "getStatisticsOfIndustryByMUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/project/workbench/getStatisticsOfIndustryByN": {
    "post": {
      "tags": [
        "工作台"
      ],
      "summary": "产业统计(按项目数)",
      "operationId": "getStatisticsOfIndustryByNUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsProjectWorkbenchParam",
            "$ref": "#/definitions/AdsProjectWorkbenchParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«AdsProjectIndustryResult»»",
            "$ref": "#/definitions/R«List«AdsProjectIndustryResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/addAdsSysLogAddParam": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "新增",
      "operationId": "addAdsSysLogAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogAddParam",
            "$ref": "#/definitions/AdsSysLogAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/deleteByIds": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_10",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogIdsParam",
            "$ref": "#/definitions/AdsSysLogIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/getAdsSysLogDetailResult": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "列表单条记录详情",
      "operationId": "getAdsSysLogDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogIdParam",
            "$ref": "#/definitions/AdsSysLogIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsSysLogDetailResult»",
            "$ref": "#/definitions/R«AdsSysLogDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/getAdsSysLogIdResult": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsSysLogIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogIdParam",
            "$ref": "#/definitions/AdsSysLogIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsSysLogIdResult»",
            "$ref": "#/definitions/R«AdsSysLogIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/getAdsSysLogListResult": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsSysLogListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogListParam",
            "$ref": "#/definitions/AdsSysLogListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsSysLogResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsSysLogResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/listExcelExport": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "分页列表-excel导出数据",
      "operationId": "listExcelExportUsingPOST_3",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogListParam",
            "$ref": "#/definitions/AdsSysLogListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ExcelExportResult»",
            "$ref": "#/definitions/R«ExcelExportResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/sys/log/update": {
    "post": {
      "tags": [
        "系统日志表"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_13",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsSysLogUpdateParam",
            "$ref": "#/definitions/AdsSysLogUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/undisabled/company/addAdsUndisabledCompanyAddParam": {
    "post": {
      "tags": [
        "园区僵尸企业表"
      ],
      "summary": "新增",
      "operationId": "addAdsUndisabledCompanyAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsUndisabledCompanyAddParam",
            "$ref": "#/definitions/AdsUndisabledCompanyAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/undisabled/company/deleteByIds": {
    "post": {
      "tags": [
        "园区僵尸企业表"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_11",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsUndisabledCompanyIdsParam",
            "$ref": "#/definitions/AdsUndisabledCompanyIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/undisabled/company/getAdsUndisabledCompanyIdResult": {
    "post": {
      "tags": [
        "园区僵尸企业表"
      ],
      "summary": "通过id单条获取",
      "operationId": "getAdsUndisabledCompanyIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsUndisabledCompanyIdParam",
            "$ref": "#/definitions/AdsUndisabledCompanyIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AdsUndisabledCompanyIdResult»",
            "$ref": "#/definitions/R«AdsUndisabledCompanyIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/undisabled/company/getAdsUndisabledCompanyListResult": {
    "post": {
      "tags": [
        "园区僵尸企业表"
      ],
      "summary": "列表分页获取",
      "operationId": "getAdsUndisabledCompanyListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsUndisabledCompanyListParam",
            "$ref": "#/definitions/AdsUndisabledCompanyListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsUndisabledCompanyResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsUndisabledCompanyResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/ads/voice/uploadVoiceFile": {
    "post": {
      "tags": [
        "百度语音识别接口"
      ],
      "summary": "语音识别",
      "operationId": "fileUsingPOST_2",
      "consumes": [
        "multipart/form-data"
      ],
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "file",
          "in": "formData",
          "description": "语音文件",
          "required": true,
          "type": "ref"
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«object»",
            "$ref": "#/definitions/R«object»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "1"
    }
  },
  "/pc/big/thirdscreen/getbigscreensymbolizecompanylistresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "区域的代表企业分页列表",
      "operationId": "getBigScreenSymbolizeCompanyListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AdsBigScreenSymbolizeCompanyListParam",
            "$ref": "#/definitions/AdsBigScreenSymbolizeCompanyListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«AdsBigScreenSymbolizeCompanyResult»»",
            "$ref": "#/definitions/R«PageInfo«AdsBigScreenSymbolizeCompanyResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanyearlywarnyearresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "预警信息统计",
      "operationId": "getCompanyEarlyWarnYearResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyEarlyWarnYearResult»",
            "$ref": "#/definitions/R«CompanyEarlyWarnYearResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanyintroductionresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "企业介绍",
      "operationId": "getCompanyIntroductionResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyIntroductionResult»",
            "$ref": "#/definitions/R«CompanyIntroductionResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanyinvestmapresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "投资图谱",
      "operationId": "getCompanyInvestMapResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyInvestMapResult»",
            "$ref": "#/definitions/R«CompanyInvestMapResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanyknowledgeresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "知识产权",
      "operationId": "getCompanyKnowledgeResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyKnowledgeResult»",
            "$ref": "#/definitions/R«CompanyKnowledgeResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanymiddledownresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "中间数据-下部分",
      "operationId": "getCompanyMiddleDownResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyMiddleDownResult»",
            "$ref": "#/definitions/R«CompanyMiddleDownResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanymiddleupnewresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "中间数据-上部分(新的)",
      "operationId": "getCompanyMiddleUpNewResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyMiddleUpNewResult»",
            "$ref": "#/definitions/R«CompanyMiddleUpNewResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanymiddleupresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "中间数据-上部分(老的)",
      "operationId": "getCompanyMiddleUpResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyMiddleUpResult»",
            "$ref": "#/definitions/R«CompanyMiddleUpResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanypunishresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "行政处罚",
      "operationId": "getCompanyPunishResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyPunishResult»",
            "$ref": "#/definitions/R«CompanyPunishResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanyrevenuemchartlistresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "经济趋势-营收",
      "operationId": "getCompanyRevenueMChartListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRevenueMChartParam",
            "$ref": "#/definitions/CompanyRevenueMChartParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyRevenueMChartListResult»",
            "$ref": "#/definitions/R«CompanyRevenueMChartListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanytalentneedresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "人才需求",
      "operationId": "getCompanyTalentNeedResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigThirdScreenParam",
            "$ref": "#/definitions/BigThirdScreenParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyTalentNeedResult»",
            "$ref": "#/definitions/R«CompanyTalentNeedResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanytalenttraderesult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "人才趋势",
      "operationId": "getCompanyTalentTradeResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyStaffMChartParam",
            "$ref": "#/definitions/CompanyStaffMChartParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyTalentTradeResult»",
            "$ref": "#/definitions/R«CompanyTalentTradeResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/big/thirdscreen/getcompanytaxrevenuemchartlistresult": {
    "post": {
      "tags": [
        "大屏-第三屏"
      ],
      "summary": "经济趋势-税收",
      "operationId": "getCompanyTaxRevenueMChartListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyTaxRevenueMChartParam",
            "$ref": "#/definitions/CompanyTaxRevenueMChartParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyTaxRevenueMChartListResult»",
            "$ref": "#/definitions/R«CompanyTaxRevenueMChartListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/company/info/getcompanyquerychooseresult": {
    "post": {
      "tags": [
        "企业信息"
      ],
      "summary": "企业画像-搜索-部分类目选择列表",
      "operationId": "getCompanyQueryChooseResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyQueryChooseResult»",
            "$ref": "#/definitions/R«CompanyQueryChooseResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/company/info/getcompanyquerylistresult": {
    "post": {
      "tags": [
        "企业信息"
      ],
      "summary": "企业画像-搜索结果列表",
      "operationId": "getCompanyQueryListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyQueryV2Param",
            "$ref": "#/definitions/CompanyQueryV2Param"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyQueryListResult»",
            "$ref": "#/definitions/R«CompanyQueryListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/company/warn/getcompanyearlywarnlistresult": {
    "post": {
      "tags": [
        "预警-预警信息"
      ],
      "summary": "预警信息",
      "operationId": "getCompanyEarlyWarnListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyEarlyWarnListParam",
            "$ref": "#/definitions/CompanyEarlyWarnListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«CompanyEarlyWarnResult»»",
            "$ref": "#/definitions/R«PageInfo«CompanyEarlyWarnResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/company/warn/getwarntypechooselistresult": {
    "post": {
      "tags": [
        "预警-预警信息"
      ],
      "summary": "预警类型下拉列表",
      "operationId": "getWarnTypeChooseListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnTypeChooseListResult»",
            "$ref": "#/definitions/R«WarnTypeChooseListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/company/warn/handlewaredetail": {
    "post": {
      "tags": [
        "预警-预警信息"
      ],
      "summary": "风险预警处理接口",
      "operationId": "handlewaredetailUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyHandleWarnParam",
            "$ref": "#/definitions/CompanyHandleWarnParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/dataSync/initOrgData": {
    "post": {
      "tags": [
        "新锐-定时任务"
      ],
      "summary": "全量同步组织数据",
      "operationId": "initOrgDataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/dataSync/initUserData": {
    "post": {
      "tags": [
        "新锐-定时任务"
      ],
      "summary": "全量同步用户数据",
      "operationId": "initUserDataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/dataSync/initUserOrgData": {
    "post": {
      "tags": [
        "新锐-定时任务"
      ],
      "summary": "全量同步用户组织数据",
      "operationId": "initUserOrgDataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/dataSync/initlistDictByTypeData": {
    "post": {
      "tags": [
        "新锐-定时任务"
      ],
      "summary": "全量同步字典数据",
      "operationId": "initlistDictByTypeDataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "name": "token",
          "in": "query",
          "description": "token",
          "required": false,
          "type": "string"
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/dataSync/initlistDictTypeTreeData": {
    "post": {
      "tags": [
        "新锐-定时任务"
      ],
      "summary": "全量同步字典类型数据",
      "operationId": "initlistDictTypeTreeDataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "name": "token",
          "in": "query",
          "description": "token",
          "required": false,
          "type": "string"
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/dataSync/insertUserData": {
    "post": {
      "tags": [
        "新锐-定时任务"
      ],
      "summary": "新增企业端用户数据",
      "operationId": "insertCoUserDataUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/download/file": {
    "get": {
      "tags": [
        "下载接口"
      ],
      "summary": "下载文件",
      "operationId": "fileUsingGET",
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "fileName",
          "in": "query",
          "description": "fileName",
          "required": true,
          "type": "string"
        },
        {
          "name": "groupName",
          "in": "query",
          "description": "groupName",
          "required": true,
          "type": "string"
        }
      ],
      "responses": {
        "200": {
          "description": "OK"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/kafka/send": {
    "post": {
      "tags": [
        "kafka 测试Controller"
      ],
      "summary": "发送测试消息",
      "operationId": "sendKafkaUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "key",
          "in": "query",
          "description": "测试key",
          "required": false,
          "type": "string",
          "allowEmptyValue": false
        },
        {
          "name": "value",
          "in": "query",
          "description": "测试value",
          "required": false,
          "type": "string",
          "allowEmptyValue": false
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "type": "string"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/kafka/sendAck": {
    "post": {
      "tags": [
        "kafka 测试Controller"
      ],
      "summary": "发送回调测试消息",
      "operationId": "sendKafkaAckUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "key",
          "in": "query",
          "description": "测试key",
          "required": false,
          "type": "string",
          "allowEmptyValue": false
        },
        {
          "name": "value",
          "in": "query",
          "description": "测试value",
          "required": false,
          "type": "string",
          "allowEmptyValue": false
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "type": "string"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/login/getloginresult": {
    "post": {
      "tags": [
        "用户登录接口"
      ],
      "summary": "获取登录信息",
      "operationId": "getloginresultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«SysUserDetailResult»",
            "$ref": "#/definitions/R«SysUserDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/login/login": {
    "post": {
      "tags": [
        "用户登录接口"
      ],
      "summary": "账号密码登陆(无需短信验证码)",
      "description": "用户登录成功后，每个请求头中带入 Authorization ={{sessionId}}",
      "operationId": "loginUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "loginParam",
          "description": "loginParam",
          "required": true,
          "schema": {
            "originalRef": "LoginParam",
            "$ref": "#/definitions/LoginParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«LoginResult»",
            "$ref": "#/definitions/R«LoginResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/login/loginout": {
    "post": {
      "tags": [
        "用户登录接口"
      ],
      "summary": "退出登录",
      "operationId": "loginOutUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/message/type/getlisttype": {
    "get": {
      "tags": [
        "消息类型"
      ],
      "summary": "获取类型列表",
      "operationId": "getListTypeUsingGET_1",
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«MessageListTypeResult»»",
            "$ref": "#/definitions/R«List«MessageListTypeResult»»"
          }
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/mobileapi/login/ssoLogin": {
    "post": {
      "tags": [
        "移动端-登录"
      ],
      "summary": "移动端单点登录接口",
      "description": "系统单点登录接口",
      "operationId": "ssoLoginUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinruiLoginParam",
            "$ref": "#/definitions/XinruiLoginParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«SsoLoginResult»",
            "$ref": "#/definitions/R«SsoLoginResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/policy/detail/getpolicychooseresultforpc": {
    "post": {
      "tags": [
        "政策中心-政策详情表"
      ],
      "summary": "公用-政策下拉选框",
      "operationId": "getpolicychooseresultforpcUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PolicyChooseForPcListResult»",
            "$ref": "#/definitions/R«PolicyChooseForPcListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/screen/data/getBigScreenDataListResult": {
    "post": {
      "tags": [
        "指标-数据表"
      ],
      "summary": "大屏指标列表",
      "operationId": "getBigScreenDataListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "ScreenDataListParam",
            "$ref": "#/definitions/ScreenDataListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«ScreenDataResult»»",
            "$ref": "#/definitions/R«PageInfo«ScreenDataResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/screen/data/getcodedata": {
    "post": {
      "tags": [
        "指标-数据表"
      ],
      "summary": "大屏-获取指标数据",
      "operationId": "getCodeDataResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "BigScreenQueryParam",
            "$ref": "#/definitions/BigScreenQueryParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«Map«string,object»»",
            "$ref": "#/definitions/R«Map«string,object»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/screen/data/updatesqlcode": {
    "post": {
      "tags": [
        "指标-数据表"
      ],
      "summary": "指标手动更新",
      "operationId": "updatesqlcodeUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/screen/value/getscreenvaluecoderesult": {
    "post": {
      "tags": [
        "大屏-指标数据"
      ],
      "summary": "经济驾驶舱-指标获取",
      "operationId": "getScreenValueCodeResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "screenValueCodeParam",
          "description": "screenValueCodeParam",
          "required": true,
          "schema": {
            "originalRef": "ScreenValueCodeParam",
            "$ref": "#/definitions/ScreenValueCodeParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ScreenValueCodeListResult»",
            "$ref": "#/definitions/R«ScreenValueCodeListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/addSysConfigTemplateAddParam": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "新增",
      "operationId": "addSysConfigTemplateAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateAddParam",
            "$ref": "#/definitions/SysConfigTemplateAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/deleteByIds": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "批量删除数据",
      "operationId": "deleteByIdsUsingPOST_12",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateIdsParam",
            "$ref": "#/definitions/SysConfigTemplateIdsParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/getSysConfigTemplateDetailResult": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "列表单条记录详情",
      "operationId": "getSysConfigTemplateDetailResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateIdParam",
            "$ref": "#/definitions/SysConfigTemplateIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«SysConfigTemplateDetailResult»",
            "$ref": "#/definitions/R«SysConfigTemplateDetailResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/getSysConfigTemplateIdResult": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "通过id单条获取",
      "operationId": "getSysConfigTemplateIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateIdParam",
            "$ref": "#/definitions/SysConfigTemplateIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«SysConfigTemplateIdResult»",
            "$ref": "#/definitions/R«SysConfigTemplateIdResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/getSysConfigTemplateListResult": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "列表分页获取",
      "operationId": "getSysConfigTemplateListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateListParam",
            "$ref": "#/definitions/SysConfigTemplateListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«SysConfigTemplateResult»»",
            "$ref": "#/definitions/R«PageInfo«SysConfigTemplateResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/listExcelExport": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "分页列表-excel导出数据",
      "operationId": "listExcelExportUsingPOST_4",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateListParam",
            "$ref": "#/definitions/SysConfigTemplateListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ExcelExportResult»",
            "$ref": "#/definitions/R«ExcelExportResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/config/template/update": {
    "post": {
      "tags": [
        "系统设置-系统配置"
      ],
      "summary": "通过id单条更新数据",
      "operationId": "updateUsingPOST_14",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysConfigTemplateUpdateParam",
            "$ref": "#/definitions/SysConfigTemplateUpdateParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/user/center/adduserfollowcompanyaddparam": {
    "post": {
      "tags": [
        "政府端-用户关注企业表"
      ],
      "summary": "我的关注-企业关注/取消关注",
      "operationId": "addSysUserFollowCompanyAddParamUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysUserFollowCompanyAddParam",
            "$ref": "#/definitions/SysUserFollowCompanyAddParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/sys/user/center/getuserfollowcompanylistresult": {
    "post": {
      "tags": [
        "政府端-用户关注企业表"
      ],
      "summary": "我的关注-关注企业",
      "operationId": "getSysUserFollowCompanyListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "SysUserFollowCompanyListParam",
            "$ref": "#/definitions/SysUserFollowCompanyListParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«List«SysUserFollowCompanyResult»»",
            "$ref": "#/definitions/R«List«SysUserFollowCompanyResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/upload/fastdfs/file": {
    "post": {
      "tags": [
        "上传接口"
      ],
      "summary": "fastdfs多文件上传文件",
      "operationId": "fileUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "fileArray",
          "in": "formData",
          "description": "上传的文件",
          "required": true,
          "type": "array",
          "items": {
            "originalRef": "MultipartFile",
            "$ref": "#/definitions/MultipartFile"
          },
          "collectionFormat": "multi"
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«UploadListResult»",
            "$ref": "#/definitions/R«UploadListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "1"
    }
  },
  "/pc/upload/file": {
    "post": {
      "tags": [
        "上传接口"
      ],
      "summary": "本地多文件上传",
      "operationId": "fileUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "*/*"
      ],
      "parameters": [
        {
          "name": "fileArray",
          "in": "formData",
          "description": "上传的文件",
          "required": true,
          "type": "array",
          "items": {
            "originalRef": "MultipartFile",
            "$ref": "#/definitions/MultipartFile"
          },
          "collectionFormat": "multi"
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«UploadListResult»",
            "$ref": "#/definitions/R«UploadListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "1"
    }
  },
  "/pc/warn/analyse/getwarnanalyseesclusterlistresult": {
    "post": {
      "tags": [
        "风险预警(预警分析)"
      ],
      "summary": "预警分析-预警聚类分析",
      "operationId": "getWarnAnalyseESClusterListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnAnalyseESClusterListResult»",
            "$ref": "#/definitions/R«WarnAnalyseESClusterListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/analyse/getwarnanalyseindustrytop10eslistresult": {
    "post": {
      "tags": [
        "风险预警(预警分析)"
      ],
      "summary": "预警分析-行业分类Top10",
      "operationId": "getWarnAnalyseIndustryTop10ESListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnAnalyseIndustryTop10ESListResult»",
            "$ref": "#/definitions/R«WarnAnalyseIndustryTop10ESListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/analyse/getwarnanalyseleveleslistresult": {
    "post": {
      "tags": [
        "风险预警(预警分析)"
      ],
      "summary": "预警分析-预警等级分布",
      "operationId": "getWarnAnalyseLevelESListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnAnalyseLevelESListResult»",
            "$ref": "#/definitions/R«WarnAnalyseLevelESListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/analyse/getwarnanalysetendencyeesmlistresult": {
    "post": {
      "tags": [
        "风险预警(预警分析)"
      ],
      "summary": "预警分析-预警趋势",
      "operationId": "getWarnAnalyseTendencyESMListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnAnalyseTendencyESMListResult»",
            "$ref": "#/definitions/R«WarnAnalyseTendencyESMListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/analyse/getwarninginformationresult": {
    "post": {
      "tags": [
        "风险预警(预警分析)"
      ],
      "summary": "预警分析-整体解读",
      "operationId": "getWarningInformationResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getAppealInfo": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "诉求信息回显",
      "operationId": "getAppealInfoUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "AppealInfoParam",
            "$ref": "#/definitions/AppealInfoParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AppealInfoResult»",
            "$ref": "#/definitions/R«AppealInfoResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getcompanyrevenuechangechartresult": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "详情(营收骤变)",
      "operationId": "getCompanyRevenueChangeChartResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRevenueChangeChartParam",
            "$ref": "#/definitions/CompanyRevenueChangeChartParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«CompanyRevenueChangeChartResult»",
            "$ref": "#/definitions/R«CompanyRevenueChangeChartResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getcompanyriskwarninglistresult": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "预警清单-风险预警列表",
      "operationId": "getCompanyRiskWarningListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnRiskWarningListResult»",
            "$ref": "#/definitions/R«WarnRiskWarningListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getthreeservicewarnresult": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "预警清单-解决结果",
      "operationId": "getThreeServiceWarnResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "ThreeServiceWarnParam",
            "$ref": "#/definitions/ThreeServiceWarnParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«ThreeServiceWarnResult»",
            "$ref": "#/definitions/R«ThreeServiceWarnResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getwarncompanyinfobyidresult": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "预警清单-预警详情(企业信息)",
      "operationId": "getWarnCompanyInfoByIdResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "WarnCompanyInfoByIdParam",
            "$ref": "#/definitions/WarnCompanyInfoByIdParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnCompanyInfoResult»",
            "$ref": "#/definitions/R«WarnCompanyInfoResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getwarnmanagementresult": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "预警清单-处置信息(显示)",
      "operationId": "getWarnManagementResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "WarnManagementParam",
            "$ref": "#/definitions/WarnManagementParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnManagementResult»",
            "$ref": "#/definitions/R«WarnManagementResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/detail/getwarnstatusresult": {
    "post": {
      "tags": [
        "风险预警(预警清单)"
      ],
      "summary": "预警清单-预警状态和处置",
      "operationId": "getWarnStatusResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnStatusResult»",
            "$ref": "#/definitions/R«WarnStatusResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getoverviewinterpretedresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "预警概览-整体解读",
      "operationId": "getOverviewInterpretedResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarnallmchartresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "整体解读",
      "operationId": "getWarnAllMChartResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "WarnAllMChartParam",
            "$ref": "#/definitions/WarnAllMChartParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnAllMChartResult»",
            "$ref": "#/definitions/R«WarnAllMChartResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarnclassifiedeslistresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "预警概览-本年预警分类分布",
      "operationId": "getWarnClassifiedESListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnClassifiedESListResult»",
            "$ref": "#/definitions/R«WarnClassifiedESListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarncompanyestop50listresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "预警概览-企业预警排行TOP50",
      "operationId": "getWarnCompanyESTop50ListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnCompanyESTop50ListResult»",
            "$ref": "#/definitions/R«WarnCompanyESTop50ListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarnleveleslistresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "预警概览-本年预警等级分布",
      "operationId": "getWarnLevelESListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnLevelESListResult»",
            "$ref": "#/definitions/R«WarnLevelESListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarnrecordlistresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "最新动态列表",
      "operationId": "getWarnRecordListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«PageInfo«WarnRecordResult»»",
            "$ref": "#/definitions/R«PageInfo«WarnRecordResult»»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarnstateeslistresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "预警概览-最新动态",
      "operationId": "getWarnStateESListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnStateESListResult»",
            "$ref": "#/definitions/R«WarnStateESListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/warn/record/getwarntendencyeslistresult": {
    "post": {
      "tags": [
        "风险预警(预警概览)"
      ],
      "summary": "预警概览-预警趋势",
      "operationId": "getWarnTendencyESListResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "CompanyRiskWarningParam",
            "$ref": "#/definitions/CompanyRiskWarningParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«WarnTendencyESListResult»",
            "$ref": "#/definitions/R«WarnTendencyESListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/getAppList": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "5、获取应用列表接口",
      "operationId": "getAppListUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AppAllListResult»",
            "$ref": "#/definitions/R«AppAllListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/getAppList2": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "5、2、获取应用列表接口2",
      "operationId": "getAppList2UsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AppAllListResult»",
            "$ref": "#/definitions/R«AppAllListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/getLoginDirectDataResult": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "1、获取第三方登录跳转信息",
      "operationId": "getLoginDirectDataResultUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«LoginDirectDataResult»",
            "$ref": "#/definitions/R«LoginDirectDataResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/getLoginInfoByTicket": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "8、子系统根据票据获取用户信息接口",
      "operationId": "getLoginInfoByTicketUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "TicketReqParam",
            "$ref": "#/definitions/TicketReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«SsoLoginResult»",
            "$ref": "#/definitions/R«SsoLoginResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/getTicket": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "7、获取票据接口",
      "operationId": "getTicketUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«TicketResult»",
            "$ref": "#/definitions/R«TicketResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/getTokenInfo": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "2、获取令牌接口",
      "operationId": "getTokenInfoUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "TokenInfoReqParam",
            "$ref": "#/definitions/TokenInfoReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«TokenInfoResult»",
            "$ref": "#/definitions/R«TokenInfoResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/listMenuByLoginUser": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "6、获取应用菜单列表接口",
      "operationId": "listMenuByLoginUserUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«AppMenuListResult»",
            "$ref": "#/definitions/R«AppMenuListResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/ssoLogin": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "3、系统单点登录接口",
      "description": "系统单点登录接口",
      "operationId": "ssoLoginUsingPOST_1",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«SsoLoginResult»",
            "$ref": "#/definitions/R«SsoLoginResult»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/ssoLogout": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "4、系统单点注销接口",
      "operationId": "ssoLogoutUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«string»",
            "$ref": "#/definitions/R«string»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  },
  "/pc/xinrui/verifyToken": {
    "post": {
      "tags": [
        "新锐单点登录接口"
      ],
      "summary": "验证令牌接口",
      "operationId": "verifyTokenUsingPOST",
      "consumes": [
        "application/json"
      ],
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "in": "body",
          "name": "param",
          "description": "param",
          "required": true,
          "schema": {
            "originalRef": "XinRuiReqParam",
            "$ref": "#/definitions/XinRuiReqParam"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "OK",
          "schema": {
            "originalRef": "R«boolean»",
            "$ref": "#/definitions/R«boolean»"
          }
        },
        "201": {
          "description": "Created"
        },
        "401": {
          "description": "Unauthorized"
        },
        "403": {
          "description": "Forbidden"
        },
        "404": {
          "description": "Not Found"
        }
      },
      "deprecated": false,
      "x-order": "2147483647"
    }
  }
}