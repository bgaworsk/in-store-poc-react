import {configure, observable, runInAction} from 'mobx'
import HeadlessClient from '../lib/coremedia-client'

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
  getSite(siteId) { return this.sites.find(site => site.id === siteId) },

  getCropsOf(siteId) {
    const site = this.getSite(siteId);
    if (!site) {
      return [];
    }
    return site.crops;
  },

  getCropWidthsOf(siteId, ratio) {
    const site = this.getSite(siteId);
    if (!site) {
      return [];
    }
    const crop = site.crops.find(crop => crop.name === ratio);
    if (!crop) {
      return [];
    }
    return crop.sizes.map(size => size.width);
  }

});

// TODO load on demand: SiteState.loadSites();

export default SiteState;