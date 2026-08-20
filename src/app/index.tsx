import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.section}>
            <ThemedText type="labelSm" themeColor="primary">
              DESIGN SYSTEM
            </ThemedText>
            <ThemedText type="displayLg">Vibrant FinTrack</ThemedText>
            <ThemedText type="bodyLg" themeColor="onSurfaceVariant">
              Welcome to the Luminous Clarity design system. Below is a preview of the new
              typography and button components.
            </ThemedText>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="labelMd" themeColor="outline" style={styles.sectionTitle}>
              TYPOGRAPHY
            </ThemedText>
            <View style={styles.demoGroup}>
              <ThemedText type="displayLg">Display Lg (48)</ThemedText>
              <ThemedText type="headlineLg">Headline Lg (32)</ThemedText>
              <ThemedText type="headlineMd">Headline Md (20)</ThemedText>
              <ThemedText type="bodyLg">Body Lg (18)</ThemedText>
              <ThemedText type="bodyMd">Body Md (16)</ThemedText>
              <ThemedText type="labelMd">Label Md (14) - JetBrains Mono</ThemedText>
              <ThemedText type="labelSm">Label Sm (12) - JetBrains Mono</ThemedText>
            </View>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="labelMd" themeColor="outline" style={styles.sectionTitle}>
              BUTTONS
            </ThemedText>
            <View style={styles.demoGroup}>
              <Button variant="primary" onPress={() => console.log('Primary pressed')}>
                Primary Gradient
              </Button>
              <Button variant="secondary" onPress={() => console.log('Secondary pressed')}>
                Secondary Action
              </Button>
              <Button variant="outline" onPress={() => console.log('Outline pressed')}>
                Outline Button
              </Button>
              <Button variant="ghost" onPress={() => console.log('Ghost pressed')}>
                Ghost Button
              </Button>
            </View>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: BottomTabInset + Spacing.xl,
    gap: Spacing.lg,
  },
  section: {
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  card: {
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.md,
    backgroundColor: '#ffffff', // Force white card to contrast with background
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.1)',
  },
  sectionTitle: {
    marginBottom: Spacing.xs,
  },
  demoGroup: {
    gap: Spacing.md,
  },
});
