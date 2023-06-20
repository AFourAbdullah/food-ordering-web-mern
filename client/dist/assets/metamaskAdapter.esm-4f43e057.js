import{$ as h,Z as d,n as i,H as c,I as o,J as m,W as n,K as e,O as E,N as a,M as l,L as u,Q as r}from"./index-5beaefa8.js";import{B as A}from"./baseEvmAdapter.esm-62ed630d.js";var p=h();const C=d(p);class f extends A{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};super(),i(this,"adapterNamespace",c.EIP155),i(this,"currentChainNamespace",o.EIP155),i(this,"type",m.EXTERNAL),i(this,"name",n.METAMASK),i(this,"status",e.NOT_READY),i(this,"rehydrated",!1),i(this,"metamaskProvider",null),this.chainConfig=t.chainConfig||null,this.sessionTime=t.sessionTime||86400}get provider(){return this.status===e.CONNECTED&&this.metamaskProvider?this.metamaskProvider:null}set provider(t){throw new Error("Not implemented")}async init(t){if(super.checkInitializationRequirements(),this.metamaskProvider=await C({mustBeMetaMask:!0}),!this.metamaskProvider)throw E.notInstalled("Metamask extension is not installed");this.status=e.READY,this.emit(a.READY,n.METAMASK);try{l.debug("initializing metamask adapter"),t.autoConnect&&(this.rehydrated=!0,await this.connect())}catch(s){this.emit(a.ERRORED,s)}}setAdapterSettings(t){this.status!==e.READY&&t!=null&&t.sessionTime&&(this.sessionTime=t.sessionTime)}async connect(){if(super.checkConnectionRequirements(),this.chainConfig||(this.chainConfig=u(o.EIP155,1)),this.status=e.CONNECTING,this.emit(a.CONNECTING,{adapter:n.METAMASK}),!this.metamaskProvider)throw r.notConnectedError("Not able to connect with metamask");try{await this.metamaskProvider.request({method:"eth_requestAccounts"});const{chainId:t}=this.metamaskProvider;if(t!==this.chainConfig.chainId&&await this.switchChain(this.chainConfig),this.status=e.CONNECTED,!this.provider)throw r.notConnectedError("Failed to connect with provider");return this.provider.once("disconnect",()=>{this.disconnect()}),this.emit(a.CONNECTED,{adapter:n.METAMASK,reconnected:this.rehydrated}),this.provider}catch(t){throw this.status=e.READY,this.rehydrated=!1,this.emit(a.ERRORED,t),r.connectionError("Failed to login with metamask wallet")}}async disconnect(){var t;let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{cleanup:!1};await super.disconnect(),(t=this.provider)===null||t===void 0||t.removeAllListeners(),s.cleanup?(this.status=e.NOT_READY,this.metamaskProvider=null):this.status=e.READY,this.rehydrated=!1,this.emit(a.DISCONNECTED)}async getUserInfo(){if(this.status!==e.CONNECTED)throw r.notConnectedError("Not connected with wallet, Please login/connect first");return{}}async switchChain(t){if(!this.metamaskProvider)throw r.notConnectedError("Not connected with wallet");try{await this.metamaskProvider.request({method:"wallet_switchEthereumChain",params:[{chainId:t.chainId}]})}catch(s){if(s.code===4902)await this.metamaskProvider.request({method:"wallet_addEthereumChain",params:[{chainId:t.chainId,chainName:t.displayName,rpcUrls:[t.rpcTarget]}]});else throw s}}}export{f as MetamaskAdapter};
