import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LineChart} from 'react-native-chart-kit';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faChevronRight,
  faWallet,
  faCheck,
 faSliders
} from '@fortawesome/free-solid-svg-icons';
import {useGetWalletDataQuery} from '../services/api';

const OverviewScreen = () => {
  const {data: walletData, isLoading, error} = useGetWalletDataQuery();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#566DFB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading wallet data</Text>
      </View>
    );
  }

  if (!walletData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No wallet data available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hi, Clarence</Text>
            <Text style={styles.phoneNumber}>(801) 923-2930</Text>
          </View>
          <Image
            source={require('../assets/Apple.jpg')}
            style={styles.avatar}
          />
        </View>

        {/* Notification Cards */}
        <View style={styles.notificationContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.notificationCardsRow}>
              <TouchableOpacity style={[styles.notificationCard, styles.blueCard]}>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.iconCircle}>
                      <FontAwesomeIcon icon={faBell} color="white" size={20} />
                    </View>
                    <View style={styles.notificationTitleContainer}>
                      <Text style={styles.notificationTitle}>
                        Tips on increasing{'\n'}your go forward
                      </Text>
                      <Text style={styles.notificationSubtext}>
                        Lorem ipsum dolor sit amet consectetur..
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.notificationCard, styles.greenCard]}>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <View style={styles.iconCircle}>
                      <FontAwesomeIcon icon={faCheck} color="white" size={20} />
                    </View>
                    <View style={styles.notificationTitleContainer}>
                      <Text style={styles.notificationTitle}>
                        Weekly task has{'\n'}been completed!
                      </Text>
                      <Text style={styles.notificationSubtext}>
                        Lorem ipsum dolor sit amet consectetur..
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Wallet Balance Card */}
        <TouchableOpacity style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <View style={styles.walletLeftSection}>
              <View style={[styles.iconCircle, styles.walletIconCircle]}>
                <FontAwesomeIcon icon={faWallet} color="#566DFB" size={20} />
              </View>
              <View>
                <Text style={styles.walletBalance}>${walletData.balance}</Text>
                <Text style={styles.walletBalanceLabel}>Wallet Balance</Text>
              </View>
            </View>
            <View style={[styles.iconCircle, styles.walletIconCircle]}>
              <FontAwesomeIcon icon={faChevronRight} color="#566DFB" size={16} />
            </View>
          </View>
          <View style={styles.dottedLine} />
          <View style={styles.walletInfo}>
            <View style={styles.walletInfoItem}>
              <Text style={styles.walletDate}>
                {new Date(walletData.auto_fill_date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).replace(/(\d+)/, '$1th')}
              </Text>
              <Text style={styles.walletLabel}>Auto fill date</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.walletInfoItem}>
              <Text style={styles.walletAmount}>
                ${walletData.auto_fill_amount}
              </Text>
              <Text style={styles.walletLabel}>Auto fill amount</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Activity Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Activities this week</Text>
            <View style={styles.statValueContainer}>
              <Text style={[styles.statNumber, styles.redText]}>136</Text>
              <Text style={[styles.statUnit, styles.redText]}>Calls</Text>
              <Text style={styles.redText}> ↓ 7.6%</Text>
            </View>
            <Text style={styles.statSubtext}>Avg. 26 calls per day</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statTitle}>Activities this month</Text>
            <View style={styles.statValueContainer}>
              <Text style={[styles.statNumber, styles.greenText]}>986</Text>
              <Text style={[styles.statUnit, styles.greenText]}>Calls</Text>
              <Text style={styles.greenText}> ↑ 10.6%</Text>
            </View>
            <Text style={styles.statSubtext}>Avg. 146 calls per week</Text>
          </View>
        </View>

        {/* Task Completion */}
        <View style={styles.taskCompletionCard}>
          <View style={styles.taskCompletionContent}>
            <View style={styles.circularProgress}>
              <Text style={styles.taskPercentage}>76%</Text>
            </View>
            <View style={styles.taskTextContent}>
              <Text style={styles.taskTitle}>Overall Task Completion</Text>
              <Text style={styles.taskSubtext}>
                Achievement agains total calls targeted{'\n'}for the mont of September
              </Text>
            </View>
          </View>
        </View>

        {/* Campaign Stats */}
        <View style={styles.campaignContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.campaignTabs}>
            <View style={styles.tabsContainer}>
              <TouchableOpacity style={styles.activeTabButton}>
                <Text style={styles.activeTabText}>Recent</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabButton}>
                <Text style={styles.tabText}>All Groups</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabButton}>
                <Text style={styles.tabText}>Archived</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <FontAwesomeIcon icon={faSliders} color="#666" size={16} />
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.campaignCards}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.campaignCardsRow}>
                <View style={[styles.campaignCard, styles.campaignCardWidth]}>
                  <Text style={styles.campaignTitle}>Lead Generation{'\n'}Campaign</Text>
                  <Text style={styles.campaignDescription}>
                    Lorem ipsum dolor sit{'\n'}amet, consectetur..
                  </Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '48%' }]} />
                  </View>
                  <View style={styles.campaignStats}>
                    <View>
                      <Text style={styles.campaignNumber}>343</Text>
                      <Text style={styles.campaignLabel}>Completed</Text>
                    </View>
                    <View>
                      <Text style={styles.campaignNumber}>368</Text>
                      <Text style={styles.campaignLabel}>Pending</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.campaignCard, styles.campaignCardWidth]}>
                  <Text style={styles.campaignTitle}>Product Launch{'\n'}Marketing</Text>
                  <Text style={styles.campaignDescription}>
                    Lorem ipsum dolor sit{'\n'}amet, consectetur..
                  </Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '82%' }]} />
                  </View>
                  <View style={styles.campaignStats}>
                    <View>
                      <Text style={styles.campaignNumber}>488</Text>
                      <Text style={styles.campaignLabel}>Completed</Text>
                    </View>
                    <View>
                      <Text style={styles.campaignNumber}>105</Text>
                      <Text style={styles.campaignLabel}>Pending</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Activity Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTitleRow}>
              <Text style={styles.chartTitle}>September Activities</Text>
              <TouchableOpacity style={[styles.iconCircle, styles.chartIconCircle]}>
                <FontAwesomeIcon icon={faChevronRight} color="#566DFB" size={16} />
              </TouchableOpacity>
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.currentDot]} />
                <Text style={styles.legendText}>Current Month</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.previousDot]} />
                <Text style={styles.legendText}>Previous Month</Text>
              </View>
            </View>
          </View>
          <LineChart
            data={{
              labels: ['', '', '', '', '', ''],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                  color: () => '#566DFB',
                },
                {
                  data: [30, 25, 48, 70, 89, 63],
                  color: () => '#34B549',
                },
              ],
            }}
            width={350}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: () => '#566DFB',
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  headerLeft: {},
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F3BAD',
  },
  phoneNumber: {
    color: '#666',
    fontSize: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  notificationContainer: {
    marginHorizontal: -16,
    marginLeft: -2,
  },
  notificationCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  notificationCard: {
    width: 280,
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  notificationContent: {
    gap: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationTitleContainer: {
    flex: 1,
    gap: 8,
  },
  notificationTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  notificationSubtext: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 18,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#566DFB',
  },
  blueCard: {
    backgroundColor: '#566DFB',
  },
  greenCard: {
    backgroundColor: '#34B549',
  },
  walletCard: {
    backgroundColor: 'white',
    margin: 14,
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  walletLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletBalance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F3BAD',
  },
  walletBalanceLabel: {
    color: '#666',
    fontSize: 12,
  },
  dottedLine: {
    height: 1,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 12,
  },
  walletInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 16,
  },
  walletDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F3BAD',
  },
  walletAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F3BAD',
  },
  walletLabel: {
    color: '#666',
    fontSize: 12,
  },
  statsContainer: {
    marginTop: -10,
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F3BAD',
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
  },
  statUnit: {
    fontSize: 14,
    marginBottom: 3,
    marginLeft: 4,
  },
  redText: {
    color: '#E24E58',
  },
  greenText: {
    color: '#34B549',
  },
  statSubtext: {
    color: '#666',
    fontSize: 12,
  },
  taskCompletionCard: {
    backgroundColor: '#566DFB',
    marginTop: 2,
    margin: 14,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#566DFB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  taskCompletionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  circularProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderLeftColor: 'white',
    borderTopColor: 'white',
    borderRightColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
  },
  taskPercentage: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    transform: [{ rotate: '225deg' }],
  },
  taskTextContent: {
    flex: 1,
  },
  taskTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  taskSubtext: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
    lineHeight: 20,
  },
  campaignContainer: {
    padding: 14,
  },
  campaignTabs: {
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 8,
  },
  activeTabButton: {
    backgroundColor: '#566DFB',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  menuButton: {
    padding: 8,
    alignSelf: 'center',
  },
  campaignCards: {
    marginHorizontal: -16,
  },
  campaignCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 16,
  },
  campaignCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  campaignCardWidth: {
    width: 280,
  },
  campaignTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2F3BAD',
    marginBottom: 12,
    lineHeight: 28,
  },
  campaignDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
    opacity: 0.8,
  },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  campaignNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  campaignLabel: {
    color: '#666',
    fontSize: 14,
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 14,
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F3BAD',
  },
  chartLegend: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  currentDot: {
    backgroundColor: '#566DFB',
  },
  previousDot: {
    backgroundColor: '#34B549',
  },
  legendText: {
    color: '#666',
    fontSize: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIconCircle: {
    backgroundColor: 'rgba(75, 80, 233, 0.1)',
  },
  chartIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(75, 80, 233, 0.1)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#E24E58',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OverviewScreen; 