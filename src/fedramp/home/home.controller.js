(function () {
    'use strict';

    angular
        .module('fedramp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log', 'providers'];

    /**
     * @constructor
     * @memberof Controllers
     */
    function HomeController ($log, providers) {
        var self = this;
        self.title = 'FedRAMP';
        self.filters = {};

        /**
         * Determines if data is present
         * @public
         * @memberof Controllers.HomeController
         *
         * @returns
         *  A value indicating if any data is stored
         */
        self.hasData = function () {
            return providers && providers.length > 0;
        };

        /**
         * Filters and transforms data for download
         * @public
         * @memberof Controllers.HomeController
         */
        self.download = function () {
            $log.info('Download clicked');
        };
        
        /**
         * Total authorized cloud service providers
         * @public
         * @memberof Controllers.HomeController
         *
         * @returns
         *  The total authorized cloud service providers
         */
        self.totalAuthorized = function () {
            var totalAuthorized = 0;

            for (var i = 0; i < providers.length; i++) {
                if (providers[i].active === 'Active') {
                    totalAuthorized++;
                }
            }

            return totalAuthorized;
        };

        /**
         * The cost savings at a fixed rate per re-use
         * @public
         * @memberof Controllers.HomeController
         *
         * @returns
         *  The total cost savings
         */
        self.totalCostSavings = function () {
            var leveragedAtos = 0;
            var costSavings = 0;
            var estimatedSavings = 250000;

            for (var i = 0; i < providers.length; i++) {
                var p = providers[i];
                for (var j = 0; j < p.atoLetters.length; j++) {
                    if (p.atoLetters[j].active === 'Active') {
                        leveragedAtos++;
                    }
                }
            }

            costSavings = estimatedSavings * leveragedAtos;
            return Number(costSavings).toLocaleString('en');
        };

        /**
         * The total leveraged ATO letters from authorized cloud service providers
         * @public
         * @memberof Controllers.HomeController
         *
         * @returns
         *  The total leveraged ATO letters
         */
        self.leveragedAtos = function () {
            var leveragedAtos = 0;
            var costSavings = 0;

            for (var i = 0; i < providers.length; i++) {
                var p = providers[i];
                if (p.active !== 'Active') {
                    continue;
                }
                
                for (var j = 0; j < p.atoLetters.length; j++) {
                    if (p.atoLetters[j].active === 'Active') {
                        leveragedAtos++;
                    }
                }
            }

            return leveragedAtos;
        };
    }
})();
