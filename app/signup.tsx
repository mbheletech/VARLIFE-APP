@@ .. @@
               <LinearGradient
                 colors={['#FFFFFF', '#D1D5DB']}
                 style={styles.titleGradient}
               >
-                <Text style={styles.title}>Create your account</Text>
+                <Text style={styles.titleText}>Create your account</Text>
               </LinearGradient>
@@ .. @@
  titleGradient: {
    alignSelf: 'flex-start',
    marginBottom: 12,
+    padding: 2,
+    borderRadius: 8,
  },
-  title: {
+  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
-    color: 'transparent',
+    color: '#000000',
  },
}