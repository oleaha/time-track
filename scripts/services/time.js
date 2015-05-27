(function() {
    'use strict';

    angular
        .module('timeTracker')
        .factory('time', time);

    function time($resource) {

        var Time = $resource('data/time.json');

        function getTime() {

            return Time.query().$promise.then(function(results) {

                angular.forEach(results, function(result) {
                    result.loggedTime = getTimeDiff(result.start_time, result.end_time);
                });

                return results;
            }, function(error) {
                console.log(error);
            });
        }

        function getTimeDiff(start, end) {
            var diff = moment(end).diff(moment(start));
            var duration = moment.duration(diff);
            return {
                duration: duration
            }
        }

        function getTotalTime(timeEntries) {
            var totalMilliSeconds = 0;

            angular.forEach(timeEntries, function(key) {
                totalMilliSeconds += key.loggedTime.duration._milliseconds;
            });

            return {
                hours: Math.floor(moment.duration(totalMilliSeconds).asHours()),
                minutes: moment.duration(totalMilliSeconds).minutes()
            }
        }

        return {
            getTime: getTime,
            getTimeDiff: getTimeDiff,
            getTotalTime: getTotalTime
        };
    }
})();