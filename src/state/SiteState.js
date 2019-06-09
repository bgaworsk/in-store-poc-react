import {configure, observable, runInAction} from 'mobx'
import HeadlessClient from '../lib/headless-client'

configure({ enforceActions: "observed" });

const SiteState = observable.object({

  sites: [],
  loadSites() {
    HeadlessClient.getSites().then(
      response => {
        runInAction(() => {
          this.sites = response.data.content.sites;
        });
      }
    );
    // TODO Error handling
  },
  getSite(siteId) { return this.sites.find(site => site.id === siteId) }

});

SiteState.loadSites();

export default SiteState;