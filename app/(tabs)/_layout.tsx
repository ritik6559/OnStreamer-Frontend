import React from 'react';
import { Tabs } from 'expo-router';
import icons from '@/constants/icons';
import { View, StyleSheet, Image, Text } from 'react-native';

const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => {
    return <View style={ styles.tabIcon } >
        <Image source={icon} tintColor={ focused ? '#FFFFFF' : '#420039' } resizeMode='contain' style={{ width: 25, height: 25 }} />
        <Text style={{ fontWeight: focused ? 'bold' : 'normal', color: focused ? '#FFFFFF' : 'grey', fontSize: 12, marginTop: 3, flexWrap: 'nowrap'  }} >{title}</Text>
    </View>
}

const styles = StyleSheet.create({
    tabIcon: {
        flex: 1,
        width: 50,
        flexDirection: 'column',        
        alignItems: 'center',
        alignContent: 'center'    
    }
});

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {      
              elevation: 0,
              backgroundColor: '#12355B',
              borderTopWidth: 0,
              minHeight: 70
          },
          headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon icon={ icons.home } title="Home" focused={focused} />,
        
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          headerShown: false,
          title: 'Upload',
          tabBarIcon: ({ focused }) => <TabIcon icon={icons.add} focused={focused} title="Upload" />,
        }}
      />

      <Tabs.Screen 
        name="profile"
        options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabIcon icon={ icons.person } focused={focused} title="Profile"/>
        }}
      />

    </Tabs>
  );
}
